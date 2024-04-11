import { User as LocalUser } from "./core/domain/users";

declare global {
  namespace Express {
    interface User extends LocalUser {}
  }
}
