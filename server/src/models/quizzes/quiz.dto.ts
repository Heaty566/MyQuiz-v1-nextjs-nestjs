import { ObjectId } from 'mongodb';
import * as Joi from 'joi';

import { quizValidator } from '../../common/validators/quiz.validator';
import { Question } from './quiz.entity';

export class CreateQuizDto {
        name: string;
        time: number;
        userId: ObjectId;
        questions: Question[];

        static validator() {
                const schema = quizValidator(['name', 'time', 'questions']);
                return Joi.object(schema);
        }
}

export class GetScoreDto {
        answers: number[][];
        quizId: ObjectId | string;

        static validator() {
                const schema = Joi.object({
                        answers: Joi.array()
                                .required()
                                .items(Joi.array().items(Joi.number().min(0))),
                        quizId: Joi.allow(),
                });
                return schema;
        }
}
