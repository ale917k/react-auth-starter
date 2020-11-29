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

const getAuthTokenId = () => {
	console.log("auth ok");
};

// Sign JWT token
const signToken = (_id) => {
	const jwtPayload = { _id };

	return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

// Save token to Redis database
const setToken = (key, value) => {
	console.log("key", key);
	console.log("value", value);
	return Promise.resolve(redisClient.set(key, value));
};

// Create user session with JWT token saved on Redis database
const createSessions = (user) => {
	const { _id, email } = user;

	// redisClient.set(token, email);

	const token = signToken(email);

	console.log("_id", _id);
	console.log("email", email);
	console.log("token", token);

	return { success: "true", userId: _id, token };

	// return setToken(token, email)
	// 	.then((data) => console.log("setToken data", data))
	// 	.catch((err) => console.log(err));
};

// Check if user has session, if not then authenticate and create new session
const signinAuthentication = (User, passport) => (req, res) => {
	const { authorization } = req.headers;

	authorization
		? getAuthTokenId()
		: handleSignin(User, passport, req, res)
				.then((data) => {
					data.result._id
						? console.log(data) && createSessions(data.result)
						: Promise.reject(data);
				})
				.then((session) => console.log("session", session))
				.catch((err) => console.log("err", err));
};

module.exports = {
	signinAuthentication: signinAuthentication,
};

As simple as that, for some reason I can't wrap my head around what I'm doing wrong here. 

Given some backend code in Node.js, here I'm handling user authentication:

```
// Handle Signin authentication through Passport
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
```

```
// Sign JWT token
const signToken = (_id) => {
	const jwtPayload = { _id };

	return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};
```

```
// Create user session with JWT token saved on Redis database (not yet implemented)
const createSessions = (user) => {
	const { _id, email } = user;

	const token = signToken(email);

	console.log("_id", _id);
	console.log("email", email);
	console.log("token", token);

    // Code to save authentication token in Redis here

	return { success: "true", userId: _id, token };
};
```

```
// Check if user has session, if not then authenticate and create new session
const signinAuthentication = (User, passport) => (req, res) => {

	// Code here to check if User has been authenticated already, if not then handleSignin

	handleSignin(User, passport, req, res)
		.then((data) => {
		    data.result._id
				? console.log(data) && createSessions(data.result)
				: Promise.reject(data);
		})
		.then((session) => console.log("session", session))
		.catch((err) => console.log("err", err));
};
```

Ok, so given the code, let's start off saying the signinAuthentication is the function which will be called on the /users/signin route like this:
```
router.post("/signin", signin.signinAuthentication(User, passport));
```

The handleSignin function works perfectly fine, it returns a result with such shape:
```
{
    success: 'Signed in User Successfully',
    result: {
        _id: 5fbeaebd4f0aa5ba09c691a2,
        email: 'test@gmail.com',
        username: 'test',
        createdAt: 2020-01-01T00:00:00.174Z,
        updatedAt: 2020-01-01T00:00:00.174Z
    }
}
```
