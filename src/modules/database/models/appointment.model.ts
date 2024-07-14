import { BaseModel } from './base.model';

export class AppointmentModel extends BaseModel {
  static tableName = 'appoinment';

  date: string;
  start: string;
  end: string;
  slots: number;
}
