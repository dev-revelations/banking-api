import * as Joi from 'joi';
import { ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST } from '../constants/consts';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST)
        .required(),
    PORT: Joi.number().default(3000),
    SESSION_SECRET: Joi.string().required(),
});