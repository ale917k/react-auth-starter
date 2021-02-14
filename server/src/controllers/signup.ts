import { Request, Response } from "express";
import passport from "passport";
import nodemailer from "nodemailer";
import { PassportLocalModel } from "mongoose";
import { UserDocument } from "./../models/User";
import { createSessions } from "./sessions";

type ServerResponseType = {
  message: string;
  result: UserDocument;
  error: string;
};

// Set up transport protocols and authentication
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER_KEY,
    pass: process.env.MAIL_PASS_KEY,
  },
});

// Register new user through passport authentication
const handleSignup = (User: PassportLocalModel<UserDocument>, req: Request, res: Response) => {
  const user = new User({ email: req.body.email, username: req.body.username });

  return new Promise((resolve, reject) => {
    User.register(user, req.body.password)
      .then((result) => {
        passport.authenticate("local")(req, res, () => {
          const registrationConfirmationEmail = {
            from: process.env.MAIL_SENDER,
            to: req.body.email,
            subject: "Registration Confirmation",
            html: req.body.messageHtml,
          };

          transport.sendMail(registrationConfirmationEmail, (err, info) => {
            if (err) {
              reject({
                message: "Failed Sending Email",
                error: err,
              });
            } else {
              const { hash, salt, ...newUser } = result;
              resolve({
                message: "Created User Successfully",
                result: newUser,
              });
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        reject({
          message: "Failed Creating User",
          error: err,
        });
      });
  });
};

// Register new user and generate new session
const signupAuthentication = (User: PassportLocalModel<UserDocument>) => (req: Request, res: Response) => {
  handleSignup(User, req, res)
    .then((data: ServerResponseType) => (data.result._id ? createSessions(data.result) : Promise.reject(data)))
    .then((session) => res.status(201).json(session))
    .catch((err) => res.status(500).json(err));
};

export default signupAuthentication;
