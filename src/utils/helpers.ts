import { Request, Response } from "express";
import bcrypt from "bcrypt";
import AppConstants from "../constants/appConstants";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserDocument } from "../models/userModel";
import { JWTPayload } from "../types";

class Helpers {
  static checkMethod(req: Request, res: Response) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, AppConstants.saltRounds);
  }

  static async compareHashPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  static createToken(id: string, email: string) {
    return jwt.sign({ id, email }, config.TOKEN_SECRET_STRING, {
      expiresIn: AppConstants.tokenExpireTime,
    });
  }

  static createCookie(res: Response, payload: string) {
    res.cookie("feritCookie", payload, {
      maxAge: AppConstants.cookieExpireTime,
      httpOnly: true,
    });
  }

  static getUserDataToReturn(user: UserDocument) {
    const { firstName, lastName, email, _id, createdAt, updatedAt } = user;
    return { firstName, lastName, email, _id, createdAt, updatedAt };
  }

  static loginDataIsEmpty(data: { email: string; password: string }) {
    return !data.password || !data.email || !data.password.toString().trim() || !data.email.toString().trim();
  }

  static getCurrentUserData(req: Request) {
    if (!req.cookies.feritCookie) return null;
    const userEmail = (jwt.decode(req.cookies.feritCookie) as JWTPayload).email;
    const userId = (jwt.decode(req.cookies.feritCookie) as JWTPayload).id;
    return { email: userEmail, id: userId };
  }
}

export = Helpers;
