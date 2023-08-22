import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url, body, query } = req;
    const { statusCode } = res;

    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        new LoggerService().log(
          `\n[Req]: ${method} ${url} body: ${JSON.stringify(
            body,
          )} query: ${JSON.stringify(
            query,
          )}\n[Res]: statusCode: ${statusCode} [${Date.now() - now}ms]\n`,
          context.getClass().name,
        );
        return data;
      }),
    );
  }
}
