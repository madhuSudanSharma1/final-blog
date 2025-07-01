import { NextFunction, Request, Response } from 'express';
import { error_logger } from '../utils/logger';

/**
 * Middleware to handle errors
 * @param {Error} error
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  
  
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  log_error(req,res,err.message,statusCode)
  
  
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};


const log_error = (req: Request,res:Response,message:string,status:Number) => {
  const start = Date.now();
  
    res.on("finish", () => {
      const { method, originalUrl } = req;
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const userAgent = req.headers["user-agent"];
     
      const duration = Date.now() - start;
  
      error_logger.error(
        `${ip} - - [${new Date().toISOString()}] "${method} ${originalUrl}" ${status} - "${userAgent}" ${duration}ms - ${message}`
        );
        
        
    });
}