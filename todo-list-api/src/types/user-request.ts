import { Request } from "express";
import { UserPayload } from "../models/user-model";

export interface UserRequest extends Request {
  user?: UserPayload;
}
