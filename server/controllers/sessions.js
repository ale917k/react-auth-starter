const jwt = require("jsonwebtoken"),
  redis = require("redis");

// Set up Redis client
const redisClient = redis.createClient(process.env.REDIS_URI);

// Retrieve Redis token if any
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
const createSessions = async (user) => {
  const { _id } = user;

  const token = signToken(_id);

  try {
    await setToken(token, _id.toString());
    return { success: "true", userId: _id, token };
  } catch (err) {
    return err;
  }
};

module.exports = {
  createSessions: createSessions,
  getAuthTokenId: getAuthTokenId,
};
