import { Repository } from "../../shared/typings";

export type Color = {
  id: number;
  colour: string;
};

export type ColorRepositoryInterface = Repository<Color>;
