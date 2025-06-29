import { phoneSchema } from './schemas/phone.schema';
import { validateData, ValidationResult } from './validation.util';

export const phoneValidator = (phone: string): ValidationResult<string> => {
  return validateData(phone, phoneSchema);
};
