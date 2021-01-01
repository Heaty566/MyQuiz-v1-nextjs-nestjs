import { INestApplication } from '@nestjs/common';

import { User } from '../../models/users/user.entity';
import { AuthService } from '../auth.service';
import { UserRepository } from '../../models/users/user.repository';
import { ExtendRepository } from '../../models/repositories/ExtendRepository';
import { fakeData } from '../../common/test/mock/mockData';
import { conInit } from '../../common/test/getInit';

describe('Auth Service', () => {
        let app: INestApplication;
        let userRepository: ExtendRepository<User>;
        let authService: AuthService;

        beforeAll(async () => {
                const { getApp, module } = await conInit();
                app = getApp;

                authService = module.get<AuthService>(AuthService);
                userRepository = module.get<UserRepository>(UserRepository);
        });

        it('should be define', () => {
                expect(app).toBeDefined();
                expect(authService).toBeDefined();
                expect(userRepository).toBeDefined();
        });

        describe('createUserWithSocial', () => {
                let input;
                beforeAll(() => {
                        input = {
                                id: fakeData(12, 'number'),
                                fullName: fakeData(12, 'letters'),
                                email: fakeData(12, 'lettersAndNumbersLowerCase') + '@gmail.com',
                        };
                });

                it('login wit google', async () => {
                        input.type = 'googleId';
                        const user = await authService.createUserWithSocial(input);
                        expect(user).toBeDefined();
                        expect(user.googleId).toBeDefined();
                });
        });

        afterAll(async () => {
                await userRepository.clear();
                await app.close();
        });
});
