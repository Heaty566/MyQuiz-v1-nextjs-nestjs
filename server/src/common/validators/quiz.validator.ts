import * as Joi from 'joi';

import { Quiz, Question } from '../../models/quizzes/quiz.entity';
import { formatError } from './joi.error';

export function questionValidator(key: keyof Question | (keyof Question)[]) {
        function getSchema(field: keyof Question) {
                switch (field) {
                        case 'answers':
                                return Joi.array()
                                        .items(
                                                Joi.string()
                                                        .max(300)
                                                        .min(1)
                                                        .trim()
                                                        .required(),
                                        )
                                        .min(1)
                                        .required();

                        case 'question':
                                return Joi.string()
                                        .max(3000)
                                        .min(1)
                                        .trim()
                                        .required()
                                        .messages(formatError('Question'));

                        case 'correctAnswer':
                                return Joi.array()
                                        .items(
                                                Joi.number()
                                                        .max(100)
                                                        .min(0)
                                                        .required(),
                                        )
                                        .min(0)
                                        .required();
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

export function quizValidator(key: keyof Quiz | (keyof Quiz)[]) {
        function getSchema(field: keyof Quiz) {
                switch (field) {
                        case 'name':
                                return Joi.string()
                                        .min(1)
                                        .max(200)
                                        .trim()
                                        .lowercase()
                                        .required()
                                        .messages(formatError('Name', {}));

                        case 'time':
                                return Joi.number()
                                        .max(360000)
                                        .min(1)
                                        .required()
                                        .messages(formatError('Time'));

                        case 'questions':
                                return Joi.array()
                                        .items(
                                                Joi.object(
                                                        questionValidator(['answers', 'correctAnswer', 'question']),
                                                ).required(),
                                        )
                                        .min(1)
                                        .required();
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
