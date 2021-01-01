import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ObjectId } from 'mongodb';

import { UserRepository } from '../../users/user.repository';
import { AuthService } from '../../../authentication/auth.service';
import { User } from '../../users/user.entity';

import { QuizService } from '../quiz.service';
import { QuizRepository } from '../quiz.repository';
import { CreateQuizDto, GetScoreDto } from '../quiz.dto';
import { Quiz } from '../quiz.entity';

import { mockQuestion, mockQuiz } from '../../../common/test/mock/quizMock';
import { conInit } from '../../../common/test/getInit';
import { mockUser } from '../../../common/test/mock/userMock';
import { fakeData } from '../../../common/test/mock/mockData';

describe('quizController', () => {
        let app: INestApplication;
        let quizService: QuizService;
        let quizRepository: QuizRepository;
        let userRepository: UserRepository;
        let authService: AuthService;
        let user: User;
        let token: string;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                quizRepository = module.get<QuizRepository>(QuizRepository);
                userRepository = module.get<UserRepository>(UserRepository);
                quizService = module.get<QuizService>(QuizService);
                authService = module.get<AuthService>(AuthService);
        });
        beforeAll(async () => {
                user = await mockUser().save();
                token = authService.getToken(user);
        });

        it('should be defined', () => {
                expect(app).toBeDefined();
                expect(quizRepository).toBeDefined();
                expect(quizService).toBeDefined();
                expect(authService).toBeDefined();
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
                        createQuizDto.questions = questions;
                });

                it('should create new quiz', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post('/api/quiz')
                                .set('Cookie', `token=${token};`)
                                .send(createQuizDto);

                        const getUser = await userRepository.findOneById(user._id);
                        const quizIds = getUser.quizIds.map(item => String(item));

                        expect(body).toBeDefined();
                        expect(quizIds.includes(String(body._id))).toBeTruthy();
                });
        });

        describe('getScore', () => {
                let createQuizDto = new CreateQuizDto();

                beforeEach(async () => {
                        const questions = [];
                        for (let i = 0; i < 10; i++) {
                                questions.push(mockQuestion());
                        }
                        createQuizDto.name = fakeData(10, 'letters');
                        createQuizDto.time = 3600;
                        createQuizDto.questions = questions;
                });

                it('should return store', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post('/api/quiz')
                                .set('Cookie', `token=${token};`)
                                .send(createQuizDto);

                        const getUser = await userRepository.findOneById(user._id);
                        const quizIds = getUser.quizIds.map(item => String(item));

                        expect(body).toBeDefined();
                        expect(quizIds.includes(String(body._id))).toBeTruthy();
                });
        });

        describe('addQuizToCollection', () => {
                let quiz: Quiz;

                beforeAll(async () => {
                        quiz = await mockQuiz().save();
                });

                it('should add new quiz to collection', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post(`/api/quiz/${quiz._id}/collection`)
                                .set('Cookie', `token=${token};`);
                        expect(body.message).toBeDefined();
                });

                it('should return error invalid token', async () => {
                        const { body } = await request(app.getHttpServer()).post(`/api/quiz/${quiz._id}/collection`);

                        expect(body.statusCode).toBe(401);
                        expect(body.error).toBeDefined();
                        expect(body.message).toBeDefined();
                });

                it('should return error invalid quiz Id', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post(`/api/quiz/123/collection`)
                                .set('Cookie', `token=${token};`);

                        expect(body.statusCode).toBe(400);
                        expect(body.error).toBeDefined();
                        expect(body.message).toBeDefined();
                });

                it('should return error quiz doesnt exist', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post(`/api/quiz/${new ObjectId()}/collection`)
                                .set('Cookie', `token=${token};`);

                        expect(body.statusCode).toBe(404);
                        expect(body.error).toBeDefined();
                        expect(body.message).toBeDefined();
                });
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
                                quizId: '',
                        };

                        delete input.quizId;
                });

                it('should return a score', async () => {
                        const { body } = await request(app.getHttpServer())
                                .post(`/api/quiz/${quiz._id}/score`)
                                .send(input);

                        expect(body.data).toBeDefined();
                });

                it('should return an error', async () => {
                        const { body, status } = await request(app.getHttpServer()).post(`/api/quiz/${quiz._id}/score`);

                        expect(status).toBe(400);
                        expect(body).toBeDefined();
                });

                it('should return an error (incorect length of anwser)', async () => {
                        input.answers.push([1, 2]);
                        const { body, status } = await request(app.getHttpServer()).post(`/api/quiz/${quiz._id}/score`);

                        expect(status).toBe(400);
                        expect(body).toBeDefined();
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

                it('should return a quiz', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/search/csi123`);

                        expect(body).toBeDefined();
                        expect(body.length).toBeGreaterThanOrEqual(1);
                });
                it('should return array quizs', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/search/csi`);

                        expect(body).toBeDefined();
                        expect(body.length).toBeGreaterThanOrEqual(2);
                });

                it('should return empty', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/search/unkonwquiz`);

                        expect(body).toBeDefined();
                        expect(body.length).toBeGreaterThanOrEqual(0);
                });
        });

        describe('getQuiz', () => {
                let quiz: Quiz;
                beforeAll(async () => {
                        quiz = await mockQuiz(10).save();
                });
                it('should return a quiz for learn', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/${quiz._id}/learn`);

                        expect(body).toBeDefined();
                });

                it('should return a quiz for exam', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/${quiz._id}/exam`);

                        expect(body).toBeDefined();
                });
                it('should return a quiz for exam with default ', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/${quiz._id}/dsdsd`);

                        expect(body).toBeDefined();
                });

                it('should return an error with nonexist QuizId', async () => {
                        const objectId = new ObjectId();
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/${objectId}/learn`);

                        expect(body.statusCode).toBe(404);
                        expect(body.message).toBeDefined();
                        expect(body.error).toBeDefined();
                });
                it('should return an error with ivalid Id ', async () => {
                        const { body } = await request(app.getHttpServer()).get(`/api/quiz/21333/learn`);

                        expect(body.statusCode).toBe(400);
                        expect(body.message).toBeDefined();
                        expect(body.error).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await quizRepository.clear();
                await app.close();
        });
});
