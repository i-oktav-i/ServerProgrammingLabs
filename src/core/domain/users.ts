import { Repository } from "../../shared/typings";

export type User = {
  id: number;
  name: string;
  password: string;
  group: number;
};

export type UserRepositoryInterface = Pick<Repository<User>, "get"> & {
  getByUserName: (name: string) => PromiseLike<User>;
};
