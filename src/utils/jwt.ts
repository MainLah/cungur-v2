import { User } from "../models/userModel";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { SALT } from "./env";

export interface IUserToken extends Omit<User, "username" | "password"> {
  id?: Types.ObjectId;
}

export const generateToken = (user: IUserToken): string => {
  const token = jwt.sign(user, SALT, {
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
