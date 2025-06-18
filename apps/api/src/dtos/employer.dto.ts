import { interfaces } from '@kasi-flow/shared';

export const toIEmployerDTO = (
  employer: interfaces.IEmployer
): interfaces.IEmployer => {
  return {
    id: employer.id,
    name: employer.name,
    industry: employer.industry,
    websiteUrl: employer.websiteUrl,
    location: employer.location,
    description: employer.description,
    size: employer.size,
    foundedIn: employer.foundedIn,
    isVerified: employer.isVerified,
    user: employer.user
      ? {
          id: employer.user.id,
          avatarUrl: employer.user.avatarUrl,
          email: employer.user.email,
          phone: employer.user.phone,
          role: employer.user.role,
          isVerified: employer.user.isVerified,
          isActive: employer.user.isActive,
          isLocked: employer.user.isLocked,
        }
      : undefined,
  };
};
