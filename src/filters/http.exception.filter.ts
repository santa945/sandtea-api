import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

import constants from '../common/constants';

@Catch(HttpException) // 只捕获HttpException异常 不写参数捕获所有异常
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const message = exception.message;
        const exceptionResponse = exception.getResponse();
        const exceptionStatus = exception.getStatus();
        /**
         * 通常这个exceptionResponse是个对象
         * {
         *   "statusCode": 404,
         *   "message": "Cannot GET /list",
         *   "error": "Not Found"
         *  }
         * */
        const res = typeof exceptionResponse === 'string' ? { message: exceptionResponse } : { ...exceptionResponse };

        Logger.log('错误提示', message, exceptionResponse);
        Logger.log('constants', constants);
        Logger.error(exception);

        const errorResponse = {
            data: {
                ...res,
                status: exceptionStatus,
                url: request.originalUrl // 错误的url地址
            }, // 获取全部的错误信息
            message: constants.REQ_ERROR,
            retcode: constants.RET_ERROR_CODE
        };
        // 为了让前端可以获取到，这里即使exceptionStatus为400也都返回200，在返回体定义约定好的retcode
        const status = exception instanceof HttpException ? 200 : HttpStatus.INTERNAL_SERVER_ERROR;

        // 设置状态码、请求头、发送错误信息
        response.status(status)
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.send(errorResponse);
    }
}