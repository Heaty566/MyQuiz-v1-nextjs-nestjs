import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import { setMiddleware } from './setMiddleware';
//fake time
jest.useFakeTimers();

export async function conInit() {
        let getApp: INestApplication;
        const module: TestingModule = await Test.createTestingModule({
                imports: [AppModule],
        }).compile();

        getApp = module.createNestApplication();
        setMiddleware(getApp);
        await getApp.init();

        return { getApp, module };
}
