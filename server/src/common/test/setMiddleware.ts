import { INestApplication } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

export function setMiddleware(app: INestApplication) {
        app.setGlobalPrefix('/api');
        app.use(cookieParser());
}
