import { Color } from "../core/domain/color";
import { database } from "../db";
import { CommonPGRepository } from "../shared/utils";

export const colorRepository = new CommonPGRepository<Color>(
  database,
  "colour",
  ["id", "colour"]
);
