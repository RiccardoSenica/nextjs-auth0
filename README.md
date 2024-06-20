# Water utility portal

## To do

- [ ] Add database schema
- [ ] Add user authentication
- [ ] Add user roles
- [ ] Add user permissions
- [ ] Add user profile
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
