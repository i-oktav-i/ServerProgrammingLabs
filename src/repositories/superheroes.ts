import { Superhero } from "../core/domain/superheroes";
import { database } from "../db";
import { CommonPGRepository } from "../shared/utils";

export const superheroesRepository = new CommonPGRepository<Superhero>(
  database,
  "superhero",
  [
    "superhero_name",
    "full_name",
    "gender_id",
    "eye_colour_id",
    "hair_colour_id",
    "skin_colour_id",
    "race_id",
    "publisher_id",
    "alignment_id",
    "height_cm",
    "weight_kg",
  ]
);
