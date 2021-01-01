import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongodb';

import { CreateQuizDto, GetScoreDto } from './quiz.dto';
import { Quiz } from './quiz.entity';
import { UserRepository } from '../users/user.repository';
import { QuizRepository } from './quiz.repository';

@Injectable()
export class QuizService {
        constructor(
                @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
                @InjectRepository(QuizRepository) private readonly quizRepository: QuizRepository,
        ) {}

        async getQuizWithId(quizId: ObjectId | string) {
                const isValidId = isValidObjectId(quizId);
                if (!isValidId) throw new BadRequestException('Invalid Quiz id');

                const quiz = await this.quizRepository.findOneById(quizId);
                if (!quiz) throw new NotFoundException('Quiz with the given Id was not found');

                return quiz;
        }
        async searchQuizsWithField(filed: keyof Quiz, value: any) {
                const quiz = await this.quizRepository.find({ [filed]: { $regex: `.*${value}.*` } });

                return quiz;
        }

        async getScore(input: GetScoreDto): Promise<number> {
                const quiz = await this.getQuizWithId(input.quizId);
                if (quiz.questions.length !== input.answers.length) return 0;

                const correctAnswer = quiz.questions.map(item => {
                        return item.correctAnswer;
                });

                const total = correctAnswer.map((item, index) => {
                        const length = item.length;
                        let count = 0;

                        for (let i = 0; i < input.answers[index].length; i++) {
                                if (item.includes(input.answers[index][i])) {
                                        count++;
                                }
                        }
                        return count / length;
                });

                const result = total.reduce((total, current) => total + current) / correctAnswer.length;

                return result;
        }

        async createNewQuiz({ name, questions, time, userId }: CreateQuizDto) {
                const quiz = new Quiz();

                // const questionMaper = questions.map(item => {
                //         const correctAnswer = item.correctAnswer.map(answer => String(answer)).join('.');

                //         const newCorrect = jwt.sign(correctAnswer, process.env.ANSWER_KEY);

                //         return {
                //                 ...item,
                //                 correctAnswer: newCorrect,
                //         };
                // });

                quiz.questions = questions;
                quiz.name = name;
                quiz.time = time;

                const user = await this.userRepository.findOneById(userId);
                if (!user) throw new BadRequestException('User with the given Id was not found');

                await quiz.save();
                user.quizIds.push(quiz._id);
                await user.save();

                return quiz;
        }
}
