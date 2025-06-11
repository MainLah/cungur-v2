import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { SALT } from "./env";

export interface IUserToken {
  id: Types.ObjectId;
  username?: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (user: IUserToken): string => {
  const payload = {
    id: user.id.toString(),
    username: user.username,
  };
  const token = jwt.sign(payload, SALT, {
    expiresIn: "1h",
  });
  return token;
};

export const getUserData = (token: string) => {
  try {
    const user = jwt.verify(token, SALT) as IUserToken;
    return user;
  } catch (error) {
    return null;
  }
};
