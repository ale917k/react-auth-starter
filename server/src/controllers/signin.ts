import { Request, Response } from "express";
import passport from "passport";
import { PassportLocalModel } from "mongoose";
import { baseURL } from "../index";
import { UserDocument } from "./../models/User";
import { getAuthTokenId, createSessions } from "./sessions";

type ServerResponseType = {
  message: string;
  result: string;
  error: string;
};

// Log user through passport authentication
const handleSignin = (User: PassportLocalModel<UserDocument>, req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
  });

  return new Promise((resolve, reject) => {
    try {
      req.login(user, (err) => {
        if (!err) {
          passport.authenticate("local", {
            failureRedirect: `${baseURL}/users/failedSignin`,
          })(req, res, () => {
            const { _id } = req.user as UserDocument;

            resolve({
              message: "Signed in User Successfully",
              result: _id,
            });
          });
        } else {
          reject({
            message: "Failed Signin in User",
            error: err,
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Function triggered on unsuccessful login
export const failedSignin = () => (_: Request, res: Response) => {
  res.status(401).json({
    message: "Unauthorized access",
    error: 1,
  });
};

// Check if user has session, if not then authenticate and create new session
export const signinAuthentication = (User: PassportLocalModel<UserDocument>) => (req: Request, res: Response) => {
  const { authorization } = req.headers;

  authorization
    ? getAuthTokenId(authorization)
        .then((reply) => res.status(201).json(reply))
        .catch((err) =>
          res.status(401).json({
            message: "Unauthorized access",
            error: err,
          }),
        )
    : handleSignin(User, req, res)
        .then((data: ServerResponseType) => (data.result ? createSessions(data.result) : Promise.reject(data)))
        .then((session) => res.status(201).json(session))
        .catch((err) => res.status(401).json(err));
};
