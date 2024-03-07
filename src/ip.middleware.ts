import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (clientIp !== '::1') {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  }
}
