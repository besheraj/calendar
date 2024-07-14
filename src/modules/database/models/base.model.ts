import { Model } from 'objection';

export class BaseModel extends Model {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
