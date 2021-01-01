import { EntityRepository } from 'typeorm';

import { ExtendRepository } from '../repositories/ExtendRepository';
import { Quiz } from './quiz.entity';

@EntityRepository(Quiz)
export class QuizRepository extends ExtendRepository<Quiz> {}
