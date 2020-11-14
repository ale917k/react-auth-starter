let express = require("express"),
  cors = require("cors"),
  morgan = require("morgan");
// mongoose = require("mongoose"),
// dbConfig = require("./database/db"),
// passport = require("passport");

// const userAPI = require("./routes/user.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));

// app.use("/users", userAPI);

// MongoDB Configuration
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(dbConfig.db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(
//     () => {
//       console.log("Database successfully connected");
//     },
//     (error) => {
//       console.log("Database could not be connected: " + error);
//     }
//   );
// mongoose.set("useCreateIndex", true);

// Passport Authentication
// let User = require("./models/User");
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.status(201).send(`Server successfully connected on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
