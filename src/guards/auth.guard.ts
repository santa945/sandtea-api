import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private authService: AuthService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest();
        const res: Response = ctx.getResponse();
        return this.validateRequest(req, res);
    }


    async validateRequest(req: Request | any, res: Response) {
        console.log(req.cookies['xtf-uid']);
        const xtfuidCookies = req.cookies['xtf-uid']
        if (xtfuidCookies) {
            // 如果请求头有xtf-uid，则通过
            return true;
        } else {
            // 如果请求头没有xtf-uid，则调用接口新增一个，还是通过
            const userInfo: any = await this.authService.getXtfUid()

            res.cookie('xtf-uid', userInfo.xtfUid, {
                maxAge: 60 * 60 * 60 * 24 * 7,
                httpOnly: true
            });
            return true;
        }
    }
}