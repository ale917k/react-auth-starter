let mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

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
  }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
