import { Controller, UseGuards, Post, UsePipes, Body, Request, Get, Param } from '@nestjs/common';
import * as _ from 'lodash';

import { AuthGuard } from '../../authentication/auth.guard';
import { JoiValidatorPipe } from '../../common/pipes/validator.pipe';
import { CreateQuizDto, GetScoreDto } from './quiz.dto';
import { CusRequest } from '../../common/interfaces/router.interface';
import { QuizService } from './quiz.service';
import { UserService } from '../users/user.service';

@Controller('/quiz')
export class QuizController {
        constructor(private readonly quizService: QuizService, private readonly userService: UserService) {}

        @Post('/:quizId/collection')
        @UseGuards(AuthGuard)
        async addQuiz(@Request() req: CusRequest, @Param() { quizId }: { quizId: string }) {
                const quiz = await this.quizService.getQuizWithId(quizId);

                req.user.quizCollectionIds.push(quiz._id);
                await req.user.save();

                return { message: 'Quiz Added' };
        }

        @Post('/:quizId/score')
        async getScore(
                @Body(new JoiValidatorPipe(GetScoreDto.validator()))
                input: GetScoreDto,
                @Param() { quizId }: { quizId: string },
        ) {
                input.quizId = quizId;
                const score = await this.quizService.getScore(input);

                return { data: score };
        }

        @Post('/')
        @UseGuards(AuthGuard)
        @UsePipes(new JoiValidatorPipe(CreateQuizDto.validator()))
        async createNewQuiz(@Request() req: CusRequest, @Body() input: CreateQuizDto) {
                input.userId = req.user._id;
                const quiz = await this.quizService.createNewQuiz(input);

                return quiz;
        }

        @Get('/search/:name?')
        async searchQuiz(@Param() { name = '' }: { name: string }) {
                if (name.toLowerCase() == 'all') name = '';
                const quiz = await this.quizService.searchQuizsWithField('name', name.toLowerCase());

                return quiz.map(item => {
                        return { _id: item._id, name: item.name, time: item.time, questions: item.questions.length };
                });
        }

        @Get('/:quizId/:type')
        async getQuiz(@Param() { quizId, type }: { quizId: string; type: string }) {
                const quiz = await this.quizService.getQuizWithId(quizId);

                const user = await this.userService.getUserById(quiz.userId);

                if (type === 'learn') return quiz;

                return {
                        ...quiz,
                        user: _.pick(user, ['fullName', 'avatar']),
                        questions: quiz.questions.map(item => {
                                return {
                                        ...item,

                                        // correctAnswer: [],
                                };
                        }),
                };
        }
}
