import passport from "passport";
import passportJWT, { ExtractJwt, Strategy } from "passport-jwt";
import { UserModel } from "../models/users.js";
import { config } from "dotenv";
config();

export const setupPassportJWT = () => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, done) => {
        return UserModel.findById(jwtPayload.id)
          .then((user) => {
            return done(null, user!);
          })
          .catch((err) => {
            return done(err, { status: 403 });
          });
      }
    )
  );
};
