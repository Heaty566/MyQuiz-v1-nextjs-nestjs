import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { QuizService } from '../quiz.service';
import { QuizRepository } from '../quiz.repository';
import { CreateQuizDto, GetScoreDto } from '../quiz.dto';
import { Quiz } from '../quiz.entity';

import { UserRepository } from '../../users/user.repository';
import { User } from '../../users/user.entity';

import { conInit } from '../../../common/test/getInit';
import { fakeData } from '../../../common/test/mock/mockData';
import { mockQuestion, mockQuiz } from '../../../common/test/mock/quizMock';
import { mockUser } from '../../../common/test/mock/userMock';

describe('quizService', () => {
        let app: INestApplication;
        let quizService: QuizService;
        let quizRepository: QuizRepository;
        let userRepository: UserRepository;
        let user: User;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                quizRepository = module.get<QuizRepository>(QuizRepository);
                userRepository = module.get<UserRepository>(UserRepository);
                quizService = module.get<QuizService>(QuizService);
        });
        beforeAll(async () => {
                user = await mockUser().save();
        });

        it('should be defined', () => {
                expect(app).toBeDefined();
                expect(quizRepository).toBeDefined();
                expect(quizService).toBeDefined();
        });

        describe('getScore', () => {
                let quiz: Quiz;
                let input: GetScoreDto;
                beforeAll(async () => {
                        quiz = await mockQuiz().save();
                });

                beforeEach(() => {
                        input = {
                                answers: quiz.questions.map(_ => {
                                        return [1, 2];
                                }),
                                quizId: quiz._id,
                        };
                });

                it('should return 66%', async () => {
                        const result = await quizService.getScore(input);
                        expect(result).toBeGreaterThanOrEqual(2 / 3);
                });

                it('should return 0%', async () => {
                        input.answers = quiz.questions.map(_ => {
                                return [];
                        });

                        const result = await quizService.getScore(input);
                        expect(result).toBe(0);
                });

                it('should return 0%', async () => {
                        input.answers = quiz.questions.map(_ => {
                                return [4];
                        });

                        const result = await quizService.getScore(input);
                        expect(result).toBeGreaterThanOrEqual(0);
                });

                it('should return 100%', async () => {
                        input.answers = quiz.questions.map(_ => {
                                return [1, 2, 3];
                        });

                        const result = await quizService.getScore(input);
                        expect(result).toBeGreaterThanOrEqual(1);
                });

                it('should return error question.length < answer.length', async () => {
                        input.answers.length = 1;

                        const result = await quizService.getScore(input);
                        expect(result).toBeGreaterThanOrEqual(0);
                });
                it('should return error question.length < answer.length', async () => {
                        input.answers.length = 100;

                        const result = await quizService.getScore(input);
                        expect(result).toBeGreaterThanOrEqual(0);
                });
        });

        describe('createNewQuiz', () => {
                let createQuizDto = new CreateQuizDto();

                beforeEach(async () => {
                        const questions = [];
                        for (let i = 0; i < 10; i++) {
                                questions.push(mockQuestion());
                        }
                        createQuizDto.name = fakeData(10, 'letters');
                        createQuizDto.time = 3600;
                        createQuizDto.userId = user._id;
                        createQuizDto.questions = questions;
                });

                it('should create new quiz', async () => {
                        const quiz = await quizService.createNewQuiz(createQuizDto);
                        const getUser = await userRepository.findOneById(user._id);
                        const quizIds = getUser.quizIds.map(item => String(item));

                        expect(quiz).toBeDefined();
                        expect(quizIds.includes(String(quiz._id))).toBeTruthy();
                });

                it('should return error with invalid user', async () => {
                        try {
                                createQuizDto.userId = new ObjectId();
                                await quizService.createNewQuiz(createQuizDto);
                        } catch (err) {
                                expect(err).toBeDefined();
                        }
                });
        });

        describe('getQuizsByField', () => {
                beforeAll(async () => {
                        const quizOne = mockQuiz();
                        quizOne.name = 'csi123';
                        await quizOne.save();
                        const quizTwo = mockQuiz();

                        quizTwo.name = 'csi122';
                        await quizTwo.save();
                });

                it('should return array of quiz', async () => {
                        const quizs = await quizService.searchQuizsWithField('name', 'csi');

                        expect(quizs).toBeDefined();
                        expect(quizs.length).toBeGreaterThanOrEqual(2);
                });
                it('should return an empty with only one', async () => {
                        const quizs = await quizService.searchQuizsWithField('name', 'csi122');

                        expect(quizs).toBeDefined();
                        expect(quizs.length).toBeGreaterThanOrEqual(1);
                });

                it('should return an empty array', async () => {
                        const quizs = await quizService.searchQuizsWithField('name', fakeData(10));

                        expect(quizs).toBeDefined();
                        expect(quizs.length).toBe(0);
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await quizRepository.clear();
                await app.close();
        });
});
