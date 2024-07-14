import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import * as dotenv from 'dotenv';
import { AppointmentModel } from './models/appointment.model';
import { knexSnakeCaseMappers, Model } from 'objection';


dotenv.config();

const models = [
  AppointmentModel,
];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'pg',
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === 'true',
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
