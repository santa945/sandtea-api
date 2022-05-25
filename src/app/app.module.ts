import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [UserService, AuthService],
})
export class AppModule { }
