import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { router } from './common/app/routers';

async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        router(app);
        app.setGlobalPrefix('/api');

        const PORT = process.env.PORT || 4000;
        app.enableCors({ origin: process.env.CLIENT_URL, credentials: true });

        await app.listen(PORT, () => {
                Logger.log(`Listening on port ${PORT}`);
        });
}
bootstrap();
