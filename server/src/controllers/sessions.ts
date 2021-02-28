import jwt from "jsonwebtoken";
import redis from "redis";

// Set up Redis client
const redisClient = redis.createClient(process.env.REDIS_URI);

// Retrieve Redis token if any
export const getAuthTokenId = (authorization: string) => {
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
const signToken = (_id: string) => {
  const jwtPayload = { _id };

  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

// Save token to Redis database
const setToken = (key: string, value: string) => Promise.resolve(redisClient.set(key, value));

// Create user session with JWT token saved on Redis database
export const createSessions = async (userId: string) => {
  const token = signToken(userId);

  try {
    await setToken(token, userId.toString());
    return { success: "true", userId: userId, token };
  } catch (err) {
    return err;
  }
};
