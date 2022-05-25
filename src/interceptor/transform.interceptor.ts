import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
    retcode: number;
    message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const http = context.switchToHttp();
        const req = http.getRequest();
        return next.handle().pipe(
            map(data => {
                Logger.log(`${req.method} ${req.originalUrl} 请求成功`, 'Request');
                Logger.log(JSON.stringify(data), 'Response');
                let res = { ...data }
                if (!data.redirect) {
                    // 不想重定向的才需要二次包装
                    res = {
                        data,
                        retcode: 0,
                        message: '请求成功'
                    };
                }
                return res;
            })
        );
    }
}