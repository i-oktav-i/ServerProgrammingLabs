import { Pool } from "pg";
import { User, UserRepositoryInterface } from "../core/domain/users";
import { database } from "../db";
import { pgErrorToDbError } from "../shared/utils";

class UserRepository implements UserRepositoryInterface {
  constructor(private readonly database: Pool) {}

  get = async (id: number) => {
    try {
      const data = await this.database.query<User>(
        `SELECT * FROM users WHERE id = $1`,
        [id]
      );
      return data.rows[0];
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };

  getByUserName = async (name: string) => {
    try {
      const data = await this.database.query<User>(
        `SELECT * FROM users WHERE name = $1`,
        [name]
      );
      return data.rows[0];
    } catch (error) {
      throw pgErrorToDbError(error);
    }
  };
}

export const userRepository = new UserRepository(database);
