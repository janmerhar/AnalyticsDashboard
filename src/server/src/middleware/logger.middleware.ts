import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl } = req;

    if (process.env.NODE_ENV == 'development') {
      res.on('finish', () => {
        const { statusCode } = res;
        const contentLength = res.get('content-length');
        const diff = process.hrtime(startAt);
        const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${contentLength} ${responseTime} ms`,
        );
      });
    }

    next();
  }
}
