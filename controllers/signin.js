const jwt = require("jsonwebtoken"),
  redis = require("redis");

// Set up Redis client
const redisClient = redis.createClient(process.env.REDIS_URI);

const handleSignin = (User, passport, req, res) => {
  const user = new User({
    username: req.body.username,
  });

  return new Promise((resolve, reject) => {
    try {
      req.login(user, (err) => {
        if (!err) {
          passport.authenticate("local", {
            failureRedirect: "/users/failedSignin",
          })(req, res, () => {
            resolve({
              message: "Signed in User Successfully",
              result: {
                ...req.user._doc,
                hash: undefined,
                salt: undefined,
              },
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

const getAuthTokenId = (authorization) => {
  return new Promise((resolve, reject) => {
    redisClient.get(authorization, (err, reply) => {
      if (err || !reply) {
        reject(err);
      }
      resolve({ id: reply });
    });
  });
};

// Sign JWT token
const signToken = (_id) => {
  const jwtPayload = { _id };

  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

// Save token to Redis database
const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

// Create user session with JWT token saved on Redis database
const createSessions = (user) => {
  const { _id } = user;

  const token = signToken(_id);

  return setToken(token, _id.toString())
    .then(() => {
      return { success: "true", userId: _id, token };
    })
    .catch((err) => err);
};

// Check if user has session, if not then authenticate and create new session
const signinAuthentication = (User, passport) => (req, res) => {
  const { authorization } = req.headers;

  authorization
    ? getAuthTokenId(authorization)
        .then((reply) => res.status(201).json(reply))
        .catch((err) =>
          res.status(400).json({
            message: "Unauthorized",
            error: err,
          })
        )
    : handleSignin(User, passport, req, res)
        .then((data) =>
          data.result._id ? createSessions(data.result) : Promise.reject(data)
        )
        .then((session) => res.status(201).json(session))
        .catch((err) => res.status(500).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
};
