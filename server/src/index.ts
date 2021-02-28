import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import userAPI from "./routes/user";
import User from "./models/User";

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// App configuration
const app = express();
const port = process.env.PORT || 8080;
export const baseURL = process.env.NODE_ENV === "development" ? "/api" : "";

// Middlewares
app.use(cors());
app.use(express.json());
app.use(`${baseURL}/users`, userAPI);

// MongoDB configuration
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("MongoDB successfully connected");
    },
    (error) => {
      console.log("MongoDB could not be connected.", error);
    },
  );

// Passport Authentication
// createStrategy is responsible to setup passport-local LocalStrategy with the correct options
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get(`${baseURL}/`, (_, res) => {
  res.status(201).send(`Server successfully connected on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is up and running on ${process.env.NODE_ENV} - port ${port}`);
});
