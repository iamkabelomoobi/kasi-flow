import { UserRole } from '../enums';

export interface IUser {
  readonly id: string;
  avatarUrl: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  isLocked: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
