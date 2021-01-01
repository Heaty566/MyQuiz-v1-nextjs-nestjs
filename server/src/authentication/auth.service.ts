import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UserRepository } from '../models/users/user.repository';
import { User } from '../models/users/user.entity';
import * as Jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
        constructor(private readonly userRepository: UserRepository) {}

        //-----------Private--Service-------------------------------------
        // private async compareHash(value: string, encrypted: string): Promise<boolean> {
        //         return await bcrypt.compare(value, encrypted);
        // }

        // private async hashing(value: string, rounds: number): Promise<string> {
        //         const salt = await bcrypt.genSalt(rounds);
        //         return await bcrypt.hash(value, salt);
        // }

        public getToken(user: User, expired = 1) {
                return Jwt.sign(_.pick(user, ['email', '_id']), process.env.JWT_SECRET_KEY, {
                        expiresIn: expired * 86400,
                });
        }

        //-----------Controller--Service--------------------------------------
        async createUserWithSocial({
                fullName,
                id,
                email,
                avatarUrl,
        }: {
                fullName: string;
                id: string;
                email: string;
                avatarUrl: string;
        }): Promise<User> {
                const user = new User();
                user.fullName = fullName;
                user.email = email;
                user.googleId = id;
                user.avatarUrl = avatarUrl;

                return await user.save();
        }
}
