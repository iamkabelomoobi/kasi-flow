import { interfaces } from '@kasi-flow/shared';
import { adminRegisterSchema } from './schemas/admin-register.schema';
import { validateData, ValidationResult } from './validation.util';

export const adminRegisterValidator = (
  data: interfaces.IAdminRegister
): ValidationResult<interfaces.IAdminRegister> => {
  return validateData(data, adminRegisterSchema);
};
