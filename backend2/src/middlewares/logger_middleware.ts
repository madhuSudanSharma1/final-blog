import { info_logger } from '../utils/logger';
import { NextFunction, Request, Response } from 'express';


export const info_logger_middleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const { method, originalUrl } = req;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const status = res.statusCode;
    const duration = Date.now() - start;

    info_logger.info(
      `${ip} - - [${new Date().toISOString()}] "${method} ${originalUrl}" ${status} - "${userAgent}" ${duration}ms`
      );
      
      
  });

  next();
};
