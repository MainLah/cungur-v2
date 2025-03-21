import { Request, Response } from "express";
import userModel from "../models/userModel";
import { encrypt } from "../utils/encrypt";
import * as Yup from "yup";

type TRegister = {
  username: string;
  password: string;
  confirmPassword: string;
};

type TLogin = {
  username: string;
  password: string;
};

const validateRegSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export default {
  async register(req: Request, res: Response) {
    const { username, password, confirmPassword } =
      req.body as unknown as TRegister;
    try {
      await validateRegSchema.validate({ username, password, confirmPassword });
      const newUser = await userModel.create({ username, password });
      res.status(200).json({
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response) {
    const { username, password } = req.body as unknown as TLogin;

    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        res.status(403).json({
          message: "User not found",
          data: null,
        });
      }

      if (user?.password !== encrypt(password)) {
        res.status(403).json({
          message: "Invalid password",
          data: null,
        });
      }

      res.status(200).json({
        message: "Log in success",
        data: user,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
};
