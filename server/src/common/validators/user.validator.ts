import * as Joi from 'joi';

import { formatError } from './joi.error';
import { User } from '../../models/users/user.entity';

export function userValidator(key: keyof User | (keyof User)[]) {
        function getSchema(field: keyof User) {
                switch (field) {
                        case 'fullName':
                                return Joi.string()
                                        .min(5)
                                        .max(40)
                                        .trim()
                                        .lowercase()
                                        .required()
                                        .messages(formatError('Name', {}));

                        case 'isTeacher':
                                return Joi.boolean()
                                        .required()
                                        .messages(formatError('Teacher'));
                }
        }

        if (typeof key === 'object') {
                const schema = {};
                for (let field of key) {
                        schema[`${field}`] = getSchema(field);
                }

                return schema;
        }
}
