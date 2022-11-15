require('dotenv').config();

const port = process.env.DB_PORT;
const host = process.env.DB_HOST;
const dialect = process.env.DB_TYPE;
const dbName = process.env.DB_NAME;
const dbPass = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

module.exports = {
  user: dbUser,
  password: dbPass,
  db: dbName,
  dialect,
  host,
  port,
  schema: 'api',
  logging: true,

};