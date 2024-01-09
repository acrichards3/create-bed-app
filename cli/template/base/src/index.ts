import { Elysia } from 'elysia';
import { drizzle } from 'drizzle-orm/mysql2';
import { swagger } from '@elysiajs/swagger';
import * as schema from '../drizzle/schema';
import mysql from 'mysql2/promise';

// Establish a connection to your database
const poolConnection = mysql.createPool(Bun.env.DATABASE_URL as string);
export const db = drizzle(poolConnection, { mode: 'default', schema });

// Create an Elysia instance
const app = new Elysia();

// Add routes to your Elysia instance
app.get('/', () => new Response('Hello World!')); //
app.use(swagger({ path: '/swagger' })); // Endpoint for Swagger UI
/* Add your other routes here */

// Entry point for your Elysia instance (AWS Lambda handler function)
export const fetch = async (event: Request): Promise<Response> => {
  return await app.fetch(event);
};

// Local server for development
if (Bun.env.ENVIROMENT === 'development') {
  const port = 3000; // Port to listen on
  Bun.serve({
    fetch: app.fetch,
    port: port,
  });
  console.log(`Bun server listening on port ${port}`); // eslint-disable-line no-console
}
