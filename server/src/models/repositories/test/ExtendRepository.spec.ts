import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { conInit } from '../../../common/test/getInit';
import { User } from '../../users/user.entity';
import { ExtendRepository } from '../ExtendRepository';
import { UserRepository } from '../../users/user.repository';
import { mockUser } from '../../../common/test/mock/userMock';

describe('Repository extends method', () => {
        let app: INestApplication;
        let repository: ExtendRepository<User>;
        let user: User;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                repository = module.get<UserRepository>(UserRepository);
        });

        //setup database
        beforeAll(async () => {
                user = await mockUser().save();
        });

        it('should be defined', () => {
                expect(repository).toBeDefined();
        });

        describe('findOneById', () => {
                it('should return value', async () => {
                        const getUser = await repository.findOneById(user._id);

                        expect(getUser).toBeDefined();
                });
                it('should error with invalid id', async () => {
                        try {
                                await repository.findOneById('dsadsa213');
                        } catch (err) {
                                expect(err).toBeDefined();
                        }
                });
                it('should error with id does not exist', async () => {
                        const getUser = await repository.findOneById(new ObjectId());
                        expect(getUser).toBeUndefined();
                });
        });

        describe('findOneByField', () => {
                it('should return value', async () => {
                        const getUser = await repository.findOneByField('fullName', user.fullName);

                        expect(getUser).toBeDefined();
                });

                it('should error with invalid input', async () => {
                        const getUser = await repository.findOneByField('fullName', 'i dont know');
                        expect(getUser).toBeUndefined();
                });
        });

        describe('isExist', () => {
                it('should return value', async () => {
                        const getUser = await repository.isExist('email', user.email);

                        expect(getUser).toBe(true);
                });

                it('should return value with id', async () => {
                        const getUser = await repository.isExist('_id', user._id);
                        expect(getUser).toBe(true);
                });

                it('should return error with invalid input', async () => {
                        const getUser = await repository.isExist('email', 'unkonw');
                        expect(getUser).toBe(false);
                });
        });

        describe('findManyByIds', () => {
                let ids;
                beforeAll(async () => {
                        await mockUser().save();
                        await mockUser().save();
                        await mockUser().save();
                        ids = await repository.find();
                        ids = ids.map(item => item._id);
                });

                it('should return array value with objectId', async () => {
                        const arr = await repository.findManyByIds(ids);
                        expect(arr.length).toBeGreaterThanOrEqual(3);
                });
                it('should return array value with string', async () => {
                        const strIds = ids.map(item => String(item));

                        const arr = await repository.findManyByIds(strIds);
                        expect(arr.length).toBeGreaterThanOrEqual(3);
                });
        });

        afterAll(async () => {
                await repository.clear();
                await app.close();
        });
});
