import crypto from "crypto";
import { SALT } from "./env";

export const encrypt = (password: string): string => {
  const encrypted = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, "sha512")
    .toString("hex");
  return encrypted;
};
