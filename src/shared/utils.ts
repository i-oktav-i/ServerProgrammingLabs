import { DatabaseError, Pool } from "pg";
import { DbError } from "../core/domain/dbError";
import { Controller, Repository } from "./typings";
import { Request, Response } from "express";

const defaultMessage = "Internal server error";

export const pgErrorToDbError = (error: unknown): DbError => {
  const isPGError = (error: unknown): error is DatabaseError =>
    Boolean(error && typeof error === "object" && "detail" in error);

  return {
    message: isPGError(error) && error.detail ? error.detail : defaultMessage,
  };
};

export const isDBError = (error: unknown): error is DbError =>
  Boolean(error && typeof error === "object" && "message" in error);

export class CommonPGRepository<T extends Record<string, any>>
  implements Repository<T>
{
  constructor(
    private readonly database: Pool,
    private readonly tableName: string,
    private readonly fields: (keyof T & string)[]
  ) {}

  getAll = async (): Promise<T[]> => {
    try {
      const data = await this.database.query(
        `SELECT * FROM superhero.${this.tableName}`
      );
      return data.rows;
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };

  get = async (id: number): Promise<T> => {
    try {
      const data = await this.database.query(
        `SELECT * FROM superhero.${this.tableName} WHERE id = $1`,
        [id]
      );
      return data.rows[0];
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };

  create = async (entity: T): Promise<T> => {
    try {
      const data = await this.database.query(
        `INSERT INTO superhero.${this.tableName} (${this.fields.join(", ")}) 
        VALUES (${this.fields.map((_, index) => `$${index + 1}`).join(", ")})
        RETURNING *`,
        this.fields.map((field) => entity[field])
      );
      return data.rows[0];
    } catch (error) {
      console.log("error", error);
      throw pgErrorToDbError(error);
    }
  };

  update = async (entity: T): Promise<T> => {
    try {
      const data = await this.database.query(
        `UPDATE superhero.${this.tableName} SET ${this.fields
          .map((field, index) => `${field} = $${index + 1}`)
          .join(", ")}
        WHERE id = $${this.fields.length + 1}
        RETURNING *`,
        [...this.fields.map((field) => entity[field]), entity.id]
      );
      return data.rows[0];
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };

  delete = async (id: number): Promise<T> => {
    try {
      const data = await this.database.query(
        `DELETE FROM superhero.${this.tableName} WHERE id = $1 RETURNING *`,
        [id]
      );
      return data.rows[0];
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };
}

export class CommonController<T> implements Controller {
  constructor(
    private readonly repository: Repository<T>,
    private readonly name: string
  ) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.repository.getAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(isDBError(error) ? error : pgErrorToDbError(error));
    }
  };

  get = async (req: Request, res: Response) => {
    try {
      const data = await this.repository.get(Number(req.params.id));

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: `${this.name} not found` });
      }
    } catch (error) {
      res.status(500).json(isDBError(error) ? error : pgErrorToDbError(error));
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await this.repository.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json(isDBError(error) ? error : pgErrorToDbError(error));
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const data = await this.repository.update(req.body);

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: `${this.name} not found` });
      }
    } catch (error) {
      res.status(500).json(isDBError(error) ? error : pgErrorToDbError(error));
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const data = await this.repository.delete(Number(req.params.id));
      if (!data) {
        res.status(404).json({ error: `${this.name} not found` });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json(isDBError(error) ? error : pgErrorToDbError(error));
    }
  };
}
