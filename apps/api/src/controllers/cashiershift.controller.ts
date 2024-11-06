import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class CashierShiftController {
  async getShiftData(req: Request, res: Response) {
    try {
      const shiftData = await prisma.cashierShift.findMany({
        include: {
          user: {
            select: {
              fullname: true,
            },
          },
        },
      });

      return res.status(200).send({
        shiftData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createShiftData(req: Request, res: Response) {
    try {
      const { shift, user_id, ...data } = req.body;

      const lastShift = await prisma.cashierShift.findFirst({
        where: { user_id: req.user.id },
        orderBy: {
          created_at: 'desc',
        },
      });

      if ((shift === 'start' && lastShift?.shift === 'start') || (shift === 'end' && (!lastShift || lastShift.shift === 'end'))) {
        return res.status(400).send({
          msg: 'You need to start or end your previous shift first',
        });
      }
      const newData = await prisma.cashierShift.create({
        data: {
          user_id: req.user.id,
          shift,
          ...data,
        },
      });

      return res.status(200).send({
        msg: 'Cash insertion success',
        newData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
