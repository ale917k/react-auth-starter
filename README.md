# React Auth Starter

React Auth Starter is a template for React Apps requiring User authentication.

[Open Live Project](https://www.reactauthstarter.online/)

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

MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
MONGO_DATABASE=authStarterDB

# Redis
REDIS_DEV_URI=redis://redis:6379
REDIS_PRD_URI=redis://localhost:6379
```

You can then run `npm start` which will boot up all services (client, server, mongodb, redis) concurrently.

## Production

This project has been set up with a production environment ready for deployment through `AWS ECS`.

Setup the following to have your own version:

1. Create client and server images - See [doc](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html) - Make sure to build from the folders containing the `Dockerfile`s
2. Create, boot up and deploy your `ECS` cluster following this nicely crafted [doc](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-cli-tutorial-fargate.html)
3. Once deployed, view the running containers (`ecs-cli compose service ps`) and copy the address port on the browser to check out the deployed project

### Deploy cluster with load balancer

This can be helpful if you want to resolve your `DNS` with an `SSL` certificate (https).

In order to do this, setup your load balancer and target group following this [doc](https://aws.amazon.com/premiumsupport/knowledge-center/create-alb-auto-register/), then deploy the new cluster with these flags, replacing the `ARN` with the one of your newly created target group:

```bash
ecs-cli compose --project-name project_name service up --create-log-groups --cluster-config project_name --target-group-arn "arn:aws:elasticloadbalancing:eu-west-2:xxx:targetgroup/target-group-name/xxx" --container-name web --container-port 80 --ecs-profile profile_name
```

Container name and port are referring to the container you want to expose to your `ALB` and so what will be seen from the outside world.

If you want `SSL` encryption enabled, make sure you create a new certificate through `AWS ACM` (or what you prefer really) for your domain name, then add a listener on `HTTPS` port `443` to your `ALB` and assign the certificate - More info [here](https://aws.amazon.com/premiumsupport/knowledge-center/associate-acm-certificate-alb-nlb/#Associate_an_ACM_SSL_certificate_with_an_Application_Load_Balancer).

### Test production environment locally

For testing production environment locally (useful for debugging purposes):

1. Update the nginx upstream server on `nginx.conf` from `server localhost:8080` to `server node:8080`, where `node` is the name of the server container you want to reach
2. On your `.env`, update your `MONGO_PRD_URI` and `REDIS_PRD_URI` from `localhost` to `mongodb` / `redis`
3. On `docker-compose.prd.yml`, substitute the client image with the local build, changing `image: ...` with `build: ./client/`; Do the same for the node container (server)
4. Still on `docker-compose.prd.yml`, comment out all `AWS CloudWatch` loggings from each container, as not being supported on docker-compose files outside `AWS`
5. Run `npm run start:prd`

## License

[MIT](https://choosealicense.com/licenses/mit/)
