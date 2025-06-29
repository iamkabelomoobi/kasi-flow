import { emailSchema } from './schemas/email.schema';
import { validateData, ValidationResult } from './validation.util';

export const emailValidator = (email: string): ValidationResult<string> => {
  return validateData(email, emailSchema);
};
