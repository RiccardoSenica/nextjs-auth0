# Auth0 demo

## Commands

Install dependencies

```bash
yarn
```

Run Postgres on Docker

```bash
docker-compose up
```

Run Prisma migrations

```bash
yarn prisma:migrate
```

Generate Prisma client

```bash
yarn prisma:generate
```

Reset Prisma database

```bash
yarn db:reset
```

## Auth0 Webhook

Auth0 Flow to register new users

```bash
const axios = require('axios');

exports.onExecutePostUserRegistration = async (event) => {
  await axios.post(event.secrets.WEBHOOK_URL, { email: event.user.email }, {
    headers: {
      'Authorization': `Bearer ${event.secrets.AUTH0_API_SECRET_KEY}`,
      'Content-Type': 'application/json'
    }
  });
};
```

Add the following secrets to your Flow:

- `WEBHOOK_URL`: The URL of your webhook.
- `AUTH0_API_SECRET_KEY`: The Auth0 API secret key.
