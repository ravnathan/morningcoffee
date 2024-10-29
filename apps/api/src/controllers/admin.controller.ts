import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class AdminController {
  async getAllCashier(req: Request, res: Response) {
    try {
      const cashiersData = await prisma.user.findMany({
        where: { role: 'cashier' },
      });

      return res.status(200).send({
        cashiersData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createCashier(req: Request, res: Response) {
    try {
      const existingCashier = await prisma.user.findUnique({
        where: { username: req.body.username },
      });

      if (existingCashier) throw 'User has already existed';

      const cashier = await prisma.user.create({
        data: {
          ...req.body,
          role: 'cashier',
        },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Cashier data created',
        cashier,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async editCashier(req: Request, res: Response) {
    try {
      const cashierData = await prisma.user.findUnique({
        where: { username: req.body.username },
      });

      if (!cashierData) throw 'No user found';
      const newData = await prisma.user.update({
        where: { username: cashierData.username },
        data: {
          ...req.body,
        },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Cashier data has been updated',
        newData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async deleteCashier(req: Request, res: Response) {
    await prisma.user.delete({
      where: { username: req.body.username },
    });

    return res.status(200).send({
      status: 'ok',
      msg: 'Cashier data has been deleted',
    });
  }
}


