import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService implements LoggerService {
  log(message: any, ...optionalParams: any[]) {
    console.log(`Log ${message} : ${optionalParams}`);
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(`error ${message} : ${optionalParams}`);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(`warn ${message} : ${optionalParams}`);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.log(`debug ${message} : ${optionalParams}`);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`verbose ${message} : ${optionalParams}`);
  }
}
