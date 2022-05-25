// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('getUserInfo');
    // .forRoutes('getUserInfo/:id'); //指定中间件的应用路径/getUserInfo/:id  
    //也可以通过如下方式指定包含中间件的请求方法
    // .forRoutes({ path: 'getUserInfo', method: RequestMethod.GET });

    //也可以使用通配符来匹配路径，如以下示例
    //forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });

    // 通过以下方法来针对不同控制器使用中间件，也可以传递一个由逗号分隔的控制器列表
    //.forRoutes(getUserInfoController);

    // 通过exclude和路径方法来排除特定路径
    //.exclude(
    //{ path: 'getUserInfo', method: RequestMethod.GET },
    //{ path: 'getUserInfo', method: RequestMethod.POST })
  }
}