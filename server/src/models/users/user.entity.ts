import { BaseEntity, Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class User extends BaseEntity {
        @ObjectIdColumn()
        _id: ObjectId;

        @Column()
        fullName: String;

        @Column()
        email: String;

        @Column()
        avatarUrl: String;

        @Column()
        isTeacher: Boolean;

        @Column()
        quizIds: ObjectId[];

        @Column()
        quizCollectionIds: ObjectId[];

        @Column()
        googleId: String;

        constructor() {
                super();
                this.isTeacher = false;
                this.quizIds = [];
                this.quizCollectionIds = [];
        }
}
