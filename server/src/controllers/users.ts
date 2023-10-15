import express, { Response, Request } from "express";
import { UserModel, createUser, getUserByEmail } from "../models/users.js";
import { authentication, random } from "../helper/index.js";
import { config } from "dotenv";
config();
import jwt, { JwtPayload } from "jsonwebtoken";
export type UserToken = {
  username: string;
  email: string;
  id: string;
};
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        msg: "Kindly fill all the required parameters email ,username ,password",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({
          msg: "User's email existing!! Try Signing in",
        })
        .end();
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    const responseObj = {
      accessToken: null,
      user: {
        username: user.username,
        email: user.email,
      },
    };

    console.log(user);
    return res.status(200).json(responseObj).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(501);
  }
};

export const createSession = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email).select(
      " +authentication.salt +authentication.password +authentication.refreshToken"
    );

    if (!user) {
      return res
        .status(422)
        .json({
          message: "Invalid email or password",
        })
        .end();
    }

    const passwordHash = authentication(user.authentication?.salt!, password);

    if (user.authentication?.password! !== passwordHash) {
      return res
        .status(422)
        .json({
          message: "Invalid email or password",
        })
        .end();
    }

    const JWTtoken = jwt.sign(
      { username: user.username, id: user._id, emial: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30s",
      }
    );
    const REFRESH_TOKEN = jwt.sign(
      { username: user.username, id: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    user.authentication!.refreshToken = REFRESH_TOKEN;
    await user.save();
    console.log({
      message: "Login successfully",
      user: {
        email: user.email,
        username: user.username,
      },
      accessToken: JWTtoken,
    });
    res
      .cookie("refresh", REFRESH_TOKEN, { httpOnly: true })
      .json({
        message: "Login successfully",
        user: {
          email: user.email,
          username: user.username,
        },
        accessToken: JWTtoken,
      })
      .end();
  } catch (error) {
    console.log("Error in creating session", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.refresh) return res.sendStatus(401);

  const refreshToken = cookies.refresh as string;

  try {
    const user = await UserModel.findOne({
      "authentication.refreshToken": refreshToken,
    });

    if (!user) return res.sendStatus(403);
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;
    if (user.username !== decoded.username) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: user.username, id: user._id, emial: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30s",
      }
    );

    return res.json({
      message: "Login successfully",
      user: {
        email: user.email,
        username: user.username,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    return res.sendStatus(403);
  }
};
