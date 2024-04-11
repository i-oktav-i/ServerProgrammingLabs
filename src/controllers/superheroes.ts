import { Superhero } from "../core/domain/superheroes";
import { superheroesRepository } from "../repositories";
import { CommonController } from "../shared/utils";

export const superheroesController = new CommonController<Superhero>(
  superheroesRepository,
  "Superhero"
);
