import { interfaces } from '@kasi-flow/shared';

const toIUserDTO = (user: interfaces.IUser): interfaces.IUser => ({
  id: user.id,
  avatarUrl: user.avatarUrl,
  email: user.email,
  phone: user.phone,
  password: user.password,
  role: user.role,
  isVerified: user.isVerified,
  isActive: user.isActive,
  isLocked: user.isLocked,
});

export { toIUserDTO };
