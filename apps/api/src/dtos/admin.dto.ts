import { interfaces } from '@kasi-flow/shared';

export const toIAdminDTO = (admin: interfaces.IAdmin): interfaces.IAdmin => {
  return {
    id: admin.id,
    firstName: admin.firstName,
    lastName: admin.lastName,
    user: admin.user
      ? {
          id: admin.user.id,
          avatarUrl: admin.user.avatarUrl,
          email: admin.user.email,
          phone: admin.user.phone,
          role: admin.user.role,
          isVerified: admin.user.isVerified,
          isActive: admin.user.isActive,
          isLocked: admin.user.isLocked,
        }
      : undefined,
  };
};
