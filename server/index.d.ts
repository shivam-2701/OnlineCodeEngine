import { UserToken } from "./src/controllers/users";
declare module "jsonwebtoken" {
  export interface JwtPayload extends UserToken {}
}
