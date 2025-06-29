import Joi from 'joi';
import { baseRegisterSchema } from './base-register.schema';

export const candidateRegisterSchema = baseRegisterSchema.keys({
  firstName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.base': 'First name should be a string',
      'string.empty': 'First name cannot be empty',
      'string.required': 'First name is required',
      'string.pattern.base': 'First name can only contain letters',
      'any.required': '"firstName" is required',
    }),
  lastName: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.base': 'Last name should be a string',
      'string.empty': 'Last name cannot be empty',
      'string.required': 'Last name is required',
      'string.pattern.base': 'Last name can only contain letters',
      'any.required': '"lastName" is required',
    }),
  type: Joi.string().optional().messages({
    'string.base': 'Type must be a string',
    'string.empty': 'Type cannot be empty',
    'any.required': 'Type is required',
  }),
  skills: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Skills must be an array of strings',
    'array.includesRequiredUnknowns': 'Skills must contain valid strings',
  }),
});
