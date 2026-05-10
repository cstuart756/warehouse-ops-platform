This project uses a local SQLite DB for developer convenience.

If you want to switch to PostgreSQL for production, update `prisma/schema.prisma` datasource `url` to `env("DATABASE_URL")` and set the environment variable accordingly.
