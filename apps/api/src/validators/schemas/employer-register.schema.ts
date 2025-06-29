import Joi from 'joi';
import { emailSchema } from './email.schema';
import { phoneSchema } from './phone.schema';
import { passwordSchema } from './password.schema';

export const employerRegisterSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  industry: Joi.string().required().messages({
    'string.base': 'Industry must be a string',
    'string.empty': 'Industry cannot be empty',
    'any.required': 'Industry is required',
  }),
  size: Joi.number().min(1).required().messages({
    'number.base': 'Size must be a number',
    'number.min': 'Size must be at least 1',
    'any.required': 'Size is required',
  }),
  email: emailSchema,
  phone: phoneSchema,
  password: passwordSchema,
});
