import { profile } from 'console';
import Joi, { Schema } from 'joi';

const usernamePattern = /^[a-zA-Z0-9_]{3,30}$/;
const usernameValidator = (value: string, helpers: any) => {
    if (!value.match(usernamePattern)) {
        return helpers.message('Username must be between 3 and 30 characters and can only contain letters, numbers, and underscores');
    }
    return value;
};

// Joi schema for user registration
const registrationSchema: Schema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  profile:Joi.string().required()
});

// Joi schema for user login
const loginSchema: Schema = Joi.object({
  username: Joi.string().custom(usernameValidator, 'Username Validation').required(),
  password: Joi.string().required(),
});

// Validation function for user registration
const validateRegistration = (data: any) => registrationSchema.validate(data, { abortEarly: false });

// Validation function for user login
const validateLogin = (data: any) => loginSchema.validate(data, { abortEarly: false });

export { validateRegistration, validateLogin };
