import { Request, Response, NextFunction } from "express";
import { ErrorStrings } from "../constants/appStrings";
import jwt from "jsonwebtoken";
import UserRepository from "../db/repositories/userRepository";
import { config } from "../config";
import { UnauthorizedError } from "../utils/errors";

function requireAuthentication(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.feritCookie;
  if (!token) return res.redirect("/login");

  jwt.verify(token, config.TOKEN_SECRET_STRING!, async (error: any, decodedToken: any) => {
    if (error) return res.redirect("/login");

    const { id } = decodedToken;

    try {
      const user = await UserRepository.getUserById(id);

      if (!user) return res.redirect("/login");

      return next();
    } catch (error) {
      return next(error);
    }
  });
}

function checkUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.feritCookie;
  if (token) {
    jwt.verify(token, config.TOKEN_SECRET_STRING!, async (error: any, decodedToken: any) => {
      if (error) {
        res.locals.user = null;
        return next();
      }
      const { id } = decodedToken;

      const user = await UserRepository.getUserById(id);
      res.locals.user = user;
      return next();
    });
  } else {
    res.locals.user = null;
    return next();
  }
}

export { requireAuthentication, checkUser };
