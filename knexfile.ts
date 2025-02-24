import type { Knex } from 'knex';
import * as dotenv from 'dotenv'

dotenv.config();

// Update with your config settings.

const config: Knex.Config = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

module.exports = config;
