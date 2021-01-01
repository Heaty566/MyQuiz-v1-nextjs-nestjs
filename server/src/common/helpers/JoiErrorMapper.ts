import { ValidationError } from 'joi';

export const JoiErrorMapper = (err: ValidationError) => {
        const errorObj = {};

        for (let item of err.details) {
                errorObj[item.context.key] = `${item.context.label} ${item.message}`;
        }

        return errorObj;
};
