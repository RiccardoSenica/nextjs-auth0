# Water utility portal

## To do

- [ ] Add user creation in database
- [ ] Add middleware for authentication
- [ ] Add user profile and settings (i.e. language)
- [ ] Add user roles
- [ ] Add user permissions
- [ ] Add module CRUD with protected routes
- [ ] Customize Auth0 login page
- [ ] Add user notifications and emails
- [ ] Add user invoices
- [ ] Add cron jobs to import data

## Commands

Install vercel cli

```bash
yarn add -g vercel@latest
```

Link to vercel

```bash
yarn vercel:link
```

Pull env variables from vercel

```bash
yarn vercel:env
```

Push Prisma schema to vercel

```bash
yarn db:push
```

Generate Prisma client

```bash
yarn prisma:generate
```

Reset Prisma database

```bash
yarn db:reset
```

Run on Docker

```bash
docker-compose up --build
```
