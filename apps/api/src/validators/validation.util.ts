import Joi from 'joi';

export interface ValidationResult<T = unknown> {
  isValid: boolean;
  errors?: string[];
  data?: T;
}

export const validateData = <T>(
  data: T,
  schema: Joi.ObjectSchema | Joi.StringSchema
): ValidationResult<T> => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return {
      isValid: false,
      errors,
    };
  }

  return {
    isValid: true,
    data: value as T,
  };
};
