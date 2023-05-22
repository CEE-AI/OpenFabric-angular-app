import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../database/users";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

// Cookie extractor function
const cookieExtractor = function (req: any) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY || "default_secret_key",
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findOne({ _id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const authenticateJwt = passport.authenticate("jwt", {
  session: true,
});

