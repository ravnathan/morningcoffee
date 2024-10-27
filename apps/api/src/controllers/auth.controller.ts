import { Request, Response } from 'express';
import prisma from '@/prisma';
import { compare } from 'bcrypt';
import { createLoginToken } from '@/helpers/createToken';
import { responseError } from '@/helpers/responseError';
import { hashData } from '@/helpers/hashData';

export class AuthController {
  async userLogin(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: req.body.username },
      });

      if (!user) throw 'User not found';
      const validPass = await compare(req.body.password, user.password);
      if (!validPass) throw 'Password is incorrect';

      const token = createLoginToken({
        id: user.id,
        role: user.role,
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Login success',
        token,
        user,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createCashier(req: Request, res: Response) {
    try {
      const hashedPass = await hashData(req.body.password);
      const cashierData = await prisma.user.create({
        data: {
          ...req.body,
          hashedPass,
          role: 'cashier',
        },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Cashier data created',
        cashierData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
