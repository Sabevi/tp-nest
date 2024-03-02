import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  private requestCounter = 0;

  use(req: Request, res: Response, next: NextFunction) {
    this.requestCounter++;
    this.logNewRequestMade();

    next();
  }

  private logNewRequestMade(): void {
    this.logger.verbose(
      `New request! Request counter : ${this.requestCounter}`,
      this.constructor.name,
    );
  }
}