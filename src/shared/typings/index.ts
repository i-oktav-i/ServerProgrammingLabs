export type Repository<T> = {
  getAll: () => PromiseLike<T[]>;
  get: (id: number) => PromiseLike<T>;
  create: (entity: any) => PromiseLike<T>;
  update: (entity: any) => PromiseLike<T>;
  delete: (entity: any) => PromiseLike<T>;
};

export type Controller = {
  getAll: (req: any, res: any) => PromiseLike<void>;
  get: (req: any, res: any) => PromiseLike<void>;
  create: (req: any, res: any) => PromiseLike<void>;
  update: (req: any, res: any) => PromiseLike<void>;
  delete: (req: any, res: any) => PromiseLike<void>;
};
