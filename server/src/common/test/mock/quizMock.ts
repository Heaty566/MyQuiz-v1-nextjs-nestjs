import { Question, Quiz } from '../../../models/quizzes/quiz.entity';
import { ObjectId } from 'mongodb';
import { fakeData } from './mockData';

export const mockQuestion = (): Question => {
        let question: Question = new Question();
        question.question = fakeData(20, 'letters');
        question.answers = [1, 2, 3, 4, 5, 6].map(_ => 'anwser');
        question.correctAnswer = [1, 2, 3];

        return question;
};

export const mockQuiz = (amountQuestion: number = 10, userId: ObjectId = new ObjectId()): Quiz => {
        let quiz: Quiz = new Quiz();
        quiz.name = fakeData(10, 'letters');
        const questions = [];
        quiz.time = 3600;
        for (let i = 0; i < amountQuestion; i++) {
                questions.push(mockQuestion());
        }
        quiz.questions = questions;

        quiz.userId = userId;

        return quiz;
};
