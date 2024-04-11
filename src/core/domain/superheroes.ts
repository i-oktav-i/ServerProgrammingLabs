import { Repository } from "../../shared/typings";

export type Superhero = {
  id: number;
  superhero_name: string;
  full_name: string;
  gender_id: string;
  eye_colour_id: number;
  hair_colour_id: number;
  skin_colour_id: number;
  race_id: number;
  publisher_id: number;
  alignment_id: number;
  height_cm: number;
  weight_kg: number;
};

export type SuperheroesRepositoryInterface = Repository<Superhero>;
