import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { QuizService } from '../quizzes/quiz.service';
import { QuizRepository } from '../quizzes/quiz.repository';

@Module({
        imports: [TypeOrmModule.forFeature([UserRepository, QuizRepository])],
        controllers: [UserController],
        providers: [UserService, QuizService],
})
export class UserModule {}
