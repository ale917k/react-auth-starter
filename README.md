# React Auth Starter

React Auth Starter is a template for React Apps requiring User authentication.

[Open Live Project](http://18.134.182.82)

## What It Uses:

- React (w/Hooks & ContextAPI)
- Typescript
- JWT Sessions
- Node.js / (w/Express & RESTful API)
- Nodemailer for sending emails upon registration confirmation
- MongoDB
- Redis as in-memory store db (used for sessions)
- Docker-compose for handling all backend services

## Installation

Make sure to have [git](https://git-scm.com/downloads), [node](https://nodejs.org/en/) and [docker](https://www.docker.com/products/docker-desktop) installed, then run:

```bash
git clone https://github.com/ale917k/react-auth-starter
cd ./react-auth-starter
```

Add an `.env` file which looks as follow:

```
# Server
MAIL_USER_KEY=<mail-user-key> # You can grab Mailtrap user and pass API keys here: (https://mailtrap.io/)
MAIL_PASS_KEY=<mail-pass-key>
MAIL_SENDER='"Example Team" <from@example.com>'

JWT_SECRET=secret

# Mongodb
MONGO_DEV_URI=mongodb://admin:password@mongodb:27017/authStarterDB
MONGO_PRD_URI=mongodb://localhost:27017/authStarterDB

MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=admin

# Redis
REDIS_DEV_URI=redis://redis:6379
REDIS_PRD_URI=redis://localhost:6379
```

You can then run `npm start` which will boot up all services (client, server, postgres, redis) concurrently.

## License

[MIT](https://choosealicense.com/licenses/mit/)
