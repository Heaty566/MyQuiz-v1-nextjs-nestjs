import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Google, VerifyCallback as GoogleCallback } from 'passport-google-oauth20';

import { UserRepository } from '../models/users/user.repository';
import { config } from '../common/constants/auth.constants';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Google, 'google') {
        constructor(private readonly userRepository: UserRepository, private readonly authService: AuthService) {
                super({
                        clientID: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_SECRET,
                        callbackURL: config.googleCallback,
                        scope: ['email', 'profile'],
                });
        }

        async validate(accessToken: string, refreshToken: string, profile: any, done: GoogleCallback): Promise<any> {
                const { id, displayName, emails, photos } = profile;
                const user = await this.userRepository.findOneByField('googleId', id);

                if (!user) {
                        const newUser = await this.authService.createUserWithSocial({
                                fullName: displayName,
                                id: id,
                                email: emails[0].value,
                                avatarUrl: photos[0].value,
                        });

                        done(null, newUser);
                }
                done(null, user);
        }
}
