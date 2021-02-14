import mongoose, { PassportLocalSchema, PassportLocalModel, PassportLocalDocument } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserDocument = PassportLocalDocument & {
  _id: string;
  email: string;
  username: string;
  password: string;
  hash: string;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
  new (...args: any): UserDocument;
};

const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  },
);

userSchema.plugin(passportLocalMongoose);

const User: PassportLocalModel<UserDocument> = mongoose.model("User", userSchema as PassportLocalSchema);

export default User;
