import { interfaces } from '@kasi-flow/shared';
import { employerRegisterSchema } from './schemas/employer-register.schema';
import { validateData, ValidationResult } from './validation.util';

export const employerRegisterValidator = (
  data: interfaces.IEmployerRegister
): ValidationResult<interfaces.IEmployerRegister> => {
  return validateData(data, employerRegisterSchema);
};
