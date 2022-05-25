import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import middleware from './middleware/middleware';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './app/auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Guards不需要考虑位置
   * Guards 执行顺序是在所有的中间件执行完之后，在任何interceptor 或者 pipe之前执行.
   * */
  // 路由鉴权守卫
  const reflector = app.get(Reflector);
  // const userService = app.get(UserService);
  const authService = app.get(AuthService);
  app.useGlobalGuards(new AuthGuard(reflector, authService));


  // 中间件
  middleware(app);

  // 全局注册【异常过滤器】，访问错误时返回固定格式，
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();