import { Request, Response, NextFunction } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction): any => {
  const authorization = req.cookies?.token;

  if (!authorization) {
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });
  }

  // const [prefix, token] = authorization.split(" ");

  // if (!(prefix === "Bearer" && token)) {
  //   return res.status(403).json({
  //     message: "Unauthorized",
  //     data: null,
  //   });
  // }

  const user = getUserData(authorization);

  if (!user) {
    return res.status(403).json({
      message: "Unauthorized",
      data: null,
    });
  }

  (req as IReqUser).user = user;

  next();
};
