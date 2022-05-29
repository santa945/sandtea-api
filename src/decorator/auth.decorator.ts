import { createParamDecorator, ExecutionContext, applyDecorators, SetMetadata } from '@nestjs/common';
// import { loginTools } from '../common/login';

/**
 * createParamDecorator: 创建参数装饰器
 * applyDecorators：组合装饰器
 * 
 * */
export const UserInfo = createParamDecorator(async (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log('res.session', data, req.cookies);

    if (!req.cookies[data]) {
        // return loginTools.loginError();
    }
    return req.session['user'];
});

export const Cookies = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const cookies = request.cookies;
        return data ? cookies?.[data] : cookies;
    },
);

export function Auth(...roles: any[]) {
    return applyDecorators(
        SetMetadata('roles', roles)//设置元数据
    );
}