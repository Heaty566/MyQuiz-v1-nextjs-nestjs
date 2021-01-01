import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { UserRepository } from '../users/user.repository';
import { QuizRepository } from './quiz.repository';
import { UserService } from '../users/user.service';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, QuizRepository])],
        providers: [QuizService, UserService],
        controllers: [QuizController],
})
export class QuizModule {}
