import type { Config } from 'drizzle-kit';

export default {
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
  driver: 'mysql2',
  out: './drizzle',
  schema: './drizzle/schema.ts',
} satisfies Config;

// Generate the schema file for your database by running `bun drizzle-kit introspect:mysql` in your terminal
