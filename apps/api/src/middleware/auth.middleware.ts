import { responseError } from '@/helpers/responseError';
import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace(`Bearer `, '');

      if (!token) throw 'Verification Failed';

      const user = verify(token, process.env.SECRET_KEY!);
      req.user = user as User;

      next();
    } catch (error) {
      responseError(res, error);
    }
  }

  checkAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== 'admin') throw 'You are not an admin'

      next()
    } catch (error) {
      responseError(res, error)
    }
  }
  
}
