import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import middleware from './middleware/middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 中间件
  middleware(app);

  await app.listen(3000);
}
bootstrap();