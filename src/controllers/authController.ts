import { NextFunction, Request, Response } from "express";
import { ErrorStrings } from "../constants/appStrings";
import UserRepository from "../db/repositories/userRepository";
import { UserDocument } from "../models/userModel";
import { BadRequestError } from "../utils/errors";
import Helpers from "../utils/helpers";

class AuthController {
  static getRegisterView(req: Request, res: Response) {
    return res.render("auth/register", { title: "Register" });
  }

  static getLoginView(req: Request, res: Response) {
    return res.render("auth/login", { title: "Login" });
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    let user: UserDocument | null;

    if (Helpers.loginDataIsEmpty({ email, password }))
      return next(new BadRequestError(ErrorStrings.INVALID_EMAIL_OR_PASSWORD));

    try {
      user = await UserRepository.getUserByEmail(email);
    } catch (error) {
      return res.status(400).json(error);
    }

    if (!user) return res.status(400).json({ message: ErrorStrings.INVALID_EMAIL_OR_PASSWORD });

    const match = await Helpers.compareHashPassword(password, user.password);

    if (!match) return res.status(400).json({ message: ErrorStrings.INVALID_EMAIL_OR_PASSWORD });

    const token = Helpers.createToken(user._id, user.email);
    Helpers.createCookie(res, token);

    return res.status(200).json({ user: user._id });
  }

  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const user = await UserRepository.save(data);
      const token = Helpers.createToken(user!._id, user!.email);
      Helpers.createCookie(res, token);

      return res.json({ user: user!._id });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie("feritCookie");
    res.redirect("/");
  }
}

export = AuthController;
