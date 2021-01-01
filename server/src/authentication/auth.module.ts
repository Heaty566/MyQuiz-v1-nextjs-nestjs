import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../models/users/user.repository';
import { GoogleStrategy } from './auth.passport';
@Module({
        imports: [TypeOrmModule.forFeature([UserRepository])],
        providers: [AuthService, GoogleStrategy],
        controllers: [AuthController],
})
export class AuthModule {}
