// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from '../middleware/logger.middleware'
import { TypeOrmModule } from '@nestjs/typeorm';
// 子模块
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { MemberModule } from './member/member.module'

@Module({
  imports: [
    // 加载连接数据库
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库ip地址
      port: 3306, // 端口
      username: 'root', // 登录名
      password: 'Zsd123456', // 密码
      database: 'sandtea-api', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
      synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    }),
    // 加载子模块
    UserModule,
    AuthModule,
    MemberModule
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