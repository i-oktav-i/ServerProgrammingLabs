import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Strategy as PassportLocalStrategy } from "passport-local";

import { userRepository } from "../repositories/users";

export const authRouter = Router();

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "",
};

passport.use(
  new Strategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userRepository.get(payload.sub);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Local Strategy
passport.use(
  new PassportLocalStrategy(async (username, password, done) => {
    try {
      const user = await userRepository.getByUserName(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      const isPasswordValid = user.password === password;
      if (!isPasswordValid) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Middleware to authenticate requests
export const authenticate = passport.authenticate("jwt", { session: false });

// Routes
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req: Request, res: Response) => {
    const token = jwt.sign({ sub: req.user?.id }, process.env.JWT_SECRET || "");
    res.json({ token });
  }
);

authRouter.get("/profile", authenticate, (req, res) => {
  res.json(req.user);
});
