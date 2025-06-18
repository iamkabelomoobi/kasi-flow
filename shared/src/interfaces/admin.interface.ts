import { IUser } from './user.interface';

export interface IAdmin {
  readonly id: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  user?: Partial<IUser>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
