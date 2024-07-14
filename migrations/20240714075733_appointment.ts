import { Knex } from "knex";

const tableName = 'appoinment';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable(tableName, (t) => {
    
    t.uuid('id').defaultTo(knex.raw("uuid_generate_v4()")).primary();
    t.text('date');
    t.text('start');
    t.text('end');
    t.integer('slots');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
