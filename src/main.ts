import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import middleware from './middleware/middleware';
import { HttpExceptionFilter } from './filters/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 中间件
  middleware(app);

  // 全局注册【异常过滤器】，访问错误时返回固定格式，
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();