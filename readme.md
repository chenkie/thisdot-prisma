# Type-Safe Databases with Prisma

👋 Welcome to the repository for Type-Safe Databases with Prisma!

This repo contains an express API that uses Prisma for database access. It is the resource that we'll use in my hour-long session on Prisma for This Dot Labs.

## Download and Install

Clone the repository and install dependencies:

```bash
npm install
```

## Run the Migrations

There is a file called `schema.prisma` found in the `prisma` directory. This is the definition for the database model. To create the tables for the database, we need to run migrations.

Start by saving a new migration.

```bash
npx prisma migrate save --experimental
```

Then run the migartion to create the tables.

```bash
npx prisma migrate up --experimental
```

Then generate the Prisma types for the data model.

```bash
npx prisma generate
```

## Run the App

The API is built using express with TypeScript and uses `ts-node-dev` for development. There is a script in `package.json` that runs the app in development mode.

```bash
npm run dev
```

## The Database

This repo uses SQLite, a file-system database that is great for development and proof-of-concept work but is not well-suited to production. The data that we create and read here is found in the file called `dev.db` in the `prisma` directory. You are free to use a different database such as MySQL or Postgres if you like. To do so, adjust the `datasource` configuration in the `schema.prisma` file.

## Access the Routes

Have a look in `server.ts`. This file contains all the express endpoints for data access and creation. As an example, go to http://localhost:3001/products in your browser to view a list of all the products in the database.

This list will initially be empty and you'll need to create some products to get started with. You can do that with the `POST` endpoint for `products`.

Send a `POST` request to http://localhost:3001/products with the following payload:

```json
{
  "name": "My first product",
  "description": "A great product",
  "price": 5000,
  "sku": "111"
}
```

## License

MIT
