import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  toUserPayload,
  UserLoginRequest,
  UserRegisterRequest,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  static async register(userRegisterRequest: UserRegisterRequest) {
    const request = Validation.validate(
      UserValidation.register,
      userRegisterRequest
    );

    const countUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (countUserWithSameEmail !== 0) {
      throw new ResponseError(400, "Email already exist!");
    }

    request.password = await bcryptjs.hash(request.password, 10);

    const user = await prismaClient.user.create({
      data: request,
    });
    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(toUserPayload(user), secretKey, { expiresIn: "1W" });
  }

  static async login(userLoginRequest: UserLoginRequest) {
    const request = Validation.validate(UserValidation.login, userLoginRequest);

    const user = await prismaClient.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (
      !user ||
      (await bcryptjs.compare(request.password, user.password)) === false
    ) {
      throw new ResponseError(400, "Email or password wrong!");
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign(toUserPayload(user), secretKey, { expiresIn: "1W" });
  }
}
