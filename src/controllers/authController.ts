import { Request, Response } from "express";
import userModel from "../models/userModel";
import { encrypt } from "../utils/encrypt";
import * as Yup from "yup";
import { generateToken } from "../utils/jwt";
import { IReqUser } from "../middlewares/authMiddleware";

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
  username: Yup.string().required().matches(/^\S+$/gm, "No spaces allowed"),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

export default {
  async register(req: Request, res: Response): Promise<any> {
    const { username, password, confirmPassword } =
      req.body as unknown as TRegister;
    try {
      await validateRegSchema.validate({ username, password, confirmPassword });

      const user = await userModel.findOne({ username: username });
      if (user) {
        return res.status(403).json({
          message: "User is already registered, please login instead",
          data: null,
        });
      }

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
  async login(req: Request, res: Response): Promise<any> {
    const { username, password } = req.body as unknown as TLogin;

    try {
      const user = await userModel.findOne({ username: username });
      if (!user) {
        return res.status(403).json({
          message: "User not found",
          data: null,
        });
      }

      if (user?.password !== encrypt(password)) {
        return res.status(403).json({
          message: "Invalid password",
          data: null,
        });
      }

      const token = generateToken({
        id: user._id,
      });

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Log in success",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(403).json({
        message: err.message,
        data: null,
      });
    }
  },
  // async me(req: IReqUser, res: Response): Promise<any> {
  //   try {
  //     const user = req.user;
  //     const result = await userModel.findById(user?.id);

  //     res.status(200).json({
  //       message: "Success get user profile",
  //       data: result,
  //     });
  //   } catch (error) {
  //     const err = error as unknown as Error;
  //     res.status(403).json({
  //       message: err.message,
  //       data: null,
  //     });
  //   }
  // },
};
