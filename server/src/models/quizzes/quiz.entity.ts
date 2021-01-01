import { ObjectIdColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ObjectId } from 'mongodb';
import * as moment from 'moment';

@Entity()
export class Quiz extends BaseEntity {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        name: string;

        @Column()
        userId: ObjectId;

        @Column()
        createDate: Date;

        @Column()
        time: number;

        @Column()
        questions: Question[];

        constructor() {
                super();
                this.createDate = moment().toDate();
        }
}

export class Question {
        @Column()
        question: string;

        @Column()
        answers: string[];

        @Column()
        correctAnswer: number[];
}
