import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { UserRepository } from '../user.repository';
import { UserService } from '../user.service';
import { conInit } from '../../../common/test/getInit';
import { UpdateUserDto } from '../user.dto';
import { mockUser } from '../../../common/test/mock/userMock';
import { User } from '../user.entity';

describe('UserController', () => {
        let app: INestApplication;
        let userRepository: UserRepository;
        let userService: UserService;
        let user: User;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                userRepository = module.get<UserRepository>(UserRepository);
                userService = module.get<UserService>(UserService);
        });

        beforeAll(async () => {
                user = await mockUser().save();
        });

        it('should be defined', () => {
                expect(app).toBeDefined();
                expect(userRepository).toBeDefined();
                expect(userService).toBeDefined();
        });

        describe('getUserById', () => {
                it('should return user information', async () => {
                        const getUser = await userService.getUserById(user._id);

                        expect(getUser.fullName).toBe(user.fullName);
                        expect(getUser.isTeacher).toBe(user.isTeacher);
                });
                it('should return error', async () => {
                        try {
                                await userService.getUserById(new ObjectId());
                        } catch (err) {
                                expect(err).toBeDefined();
                        }
                });
                it('should return error ', async () => {
                        try {
                                await userService.getUserById('inkdnwknd');
                        } catch (err) {
                                expect(err).toBeDefined();
                        }
                });
        });

        describe('updateProfile', () => {
                let updateUser: UpdateUserDto;
                beforeAll(() => {
                        updateUser = new UpdateUserDto();
                        updateUser.fullName = 'testuser';
                        updateUser.isTeacher = true;
                });
                it('should update user information', async () => {
                        const getUser = await userService.updateProfile(user, updateUser);

                        expect(getUser.fullName).toBe(updateUser.fullName);
                        expect(getUser.isTeacher).toBe(updateUser.isTeacher);
                });
        });

        afterAll(async () => {
                await app.close();
                await userRepository.clear();
        });
});
