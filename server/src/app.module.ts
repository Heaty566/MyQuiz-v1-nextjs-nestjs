import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User } from './models/users/user.entity';
import { Quiz } from './models/quizzes/quiz.entity';

import { UserModule } from './models/users/user.module';
import { AuthModule } from './authentication/auth.module';
import { QuizModule } from './models/quizzes/quiz.module';
const envPath = `./src/config/${
        process.env.NODE_ENV === 'development'
                ? '.development.env'
                : process.env.NODE_ENV === 'production'
                ? '.env'
                : '.test.env'
}`;

const db: TypeOrmModuleOptions = {
        type: 'mongodb',
        url: process.env.DB_URL,
        useUnifiedTopology: true,
        synchronize: true,
        database: 'expressApp',
        entities: [User, Quiz],
};

@Module({
        imports: [
                ServeStaticModule.forRoot({
                        rootPath: join(__dirname, '..', 'public'),
                }),
                TypeOrmModule.forRoot(db),
                ConfigModule.forRoot({
                        envFilePath: envPath,
                }),
                AuthModule,
                UserModule,
                QuizModule,
        ],
        controllers: [],
        providers: [],
})
export class AppModule {}
