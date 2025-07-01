import { User } from "@prisma/client";
export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}


export const toUserPayload = (user: User): UserPayload => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
};
