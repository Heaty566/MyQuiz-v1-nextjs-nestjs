import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { UserController } from '../user.controller';
import { UpdateUserDto } from '../user.dto';
import { AuthService } from '../../../authentication/auth.service';
import { mockUser } from '../../../common/test/mock/userMock';
import { User } from '../user.entity';
import { conInit } from '../../../common/test/getInit';

describe('UserController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let userService: UserService;
        let userController: UserController;
        let authService: AuthService;
        let user: User;
        let token: string;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                userRepository = module.get<UserRepository>(UserRepository);
                userService = module.get<UserService>(UserService);
                userController = module.get<UserController>(UserController);
                authService = module.get<AuthService>(AuthService);
        });

        beforeAll(async () => {
                user = await mockUser().save();
                token = await authService.getToken(user);
        });

        it('should be defined', () => {
                expect(app).toBeDefined();
                expect(userRepository).toBeDefined();
                expect(userService).toBeDefined();
                expect(userController).toBeDefined();
                expect(authService).toBeDefined();
        });

        describe('putProfile', () => {
                let updateUser: UpdateUserDto;
                beforeAll(() => {
                        updateUser = new UpdateUserDto();
                        updateUser.fullName = 'testuser';
                        updateUser.isTeacher = true;
                });
                it('should update user information', async () => {
                        const { body } = await request(app.getHttpServer())
                                .put('/api/user/profile')
                                .set('Cookie', `token=${token};`)
                                .send(updateUser);

                        const getUser = await userRepository.findOneById(user._id);

                        expect(getUser.fullName).toBe(updateUser.fullName);
                        expect(getUser.isTeacher).toBeTruthy();
                        expect(body).toBeDefined();
                });
                it('should return an error', async () => {
                        const { body } = await request(app.getHttpServer())
                                .put('/api/user/profile')
                                .set('Cookie', `token=${token};`);

                        expect(body).toBeDefined();
                });
        });

        describe('get user', () => {
                it('should return user', async () => {
                        const { body } = await request(app.getHttpServer())
                                .get('/api/user/')
                                .set('Cookie', `token=${token};`);

                        expect(body.data).toBeDefined();
                });
                it('should return error (invalid token)', async () => {
                        const { body } = await request(app.getHttpServer()).get('/api/user/');

                        expect(body.error).toBeDefined();
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});
