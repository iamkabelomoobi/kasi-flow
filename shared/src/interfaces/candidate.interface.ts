import { IUser } from './user.interface';

export interface ICandidate {
  readonly id?: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  skills?: Array<string>;
  isEmployed?: boolean;
  userId?: string;
  user?: Partial<IUser>;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

