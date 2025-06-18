import { interfaces } from '@kasi-flow/shared';

export const toICandidateDTO = (candidate: interfaces.ICandidate): interfaces.ICandidate => {
  return {
    id: candidate.id,
    firstName: candidate.firstName,
    lastName: candidate.lastName,
    title: candidate.title,
    skills: candidate.skills,
    isEmployed: candidate.isEmployed,
    user: candidate.user
      ? {
          id: candidate.user.id,
          avatarUrl: candidate.user.avatarUrl,
          email: candidate.user.email,
          phone: candidate.user.phone,
          role: candidate.user.role,
          isVerified: candidate.user.isVerified,
          isActive: candidate.user.isActive,
          isLocked: candidate.user.isLocked,
        }
      : undefined,
  };
};
