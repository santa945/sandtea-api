import { INestApplication, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

export default (app: INestApplication) => {
    // 解构出cookie挂载在request上
    // Logger.log(cookieParser())
    app.use(cookieParser());
};