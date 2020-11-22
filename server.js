let express = require("express"),
  cors = require("cors"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  passport = require("passport");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const userAPI = require("./routes/user");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/public", express.static("public"));

app.use("/users", userAPI);

// MongoDB Configuration
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("MongoDB successfully connected");
    },
    (error) => {
      console.log("MongoDB could not be connected: " + error);
    }
  );
mongoose.set("useCreateIndex", true);

// Passport Authentication
let User = require("./models/User");
// createStrategy is responsible to setup passport-local LocalStrategy with the correct options.
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.status(201).send(`Server successfully connected on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
