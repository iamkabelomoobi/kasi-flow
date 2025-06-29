import { interfaces } from '@kasi-flow/shared';
import { candidateRegisterSchema } from './schemas/candidate-register.schema';
import { validateData, ValidationResult } from './validation.util';

export const candidateRegisterValidator = (
  data: interfaces.ICandidateRegister
): ValidationResult<interfaces.ICandidateRegister> => {
  return validateData(data, candidateRegisterSchema);
};
