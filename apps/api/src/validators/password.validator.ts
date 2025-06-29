import { passwordSchema } from './schemas/password.schema';
import { validateData, ValidationResult } from './validation.util';

export const passwordValidator = (
  password: string
): ValidationResult<string> => {
  return validateData(password, passwordSchema);
};
