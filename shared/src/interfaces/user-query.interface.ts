import { UserRole } from '../enums';

export interface IUserQuery {
  id?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
  isVerified?: boolean;
  isLocked?: boolean;
}
