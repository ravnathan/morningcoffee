import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { formatToRupiah } from '@/utils/formatrupiah';
import { format, isSameDay } from 'date-fns';
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
      const { shift, user_id, value, ...data } = req.body;

      const lastShift = await prisma.cashierShift.findFirst({
        orderBy: { created_at: 'desc' },
      });

      if (shift === 'start') {
        if (lastShift && lastShift.shift === 'end' && value !== lastShift.value) {
          return res.status(400).send({
            ok: false,
            msg: `Starting value must match the last shift's value of ${formatToRupiah(lastShift.value)}`,
          });
        }
      }
      if (shift === 'end') {
        if (lastShift && lastShift.shift === 'start' && value < lastShift.value) {
          return res.status(400).send({
            ok: false,
            msg: `Ending value cannot be less than the starting value of ${formatToRupiah(lastShift.value)}`,
          });
        }
      }

      const newData = await prisma.cashierShift.create({
        data: {
          user_id: req.user.id,
          shift,
          value,
          ...data,
        },
      });

      return res.status(200).send({
        ok: true,
        msg: 'Shift data insertion success',
        newData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getDataEachShift(req: Request, res: Response) {
    try {
      const shifts = await prisma.cashierShift.findMany({
        orderBy: { created_at: 'desc' },
        include: { user: true },
      });

      const shiftData: any = {};

      for (let i = 0; i < shifts.length - 1; i += 2) {
        const endShift = shifts[i];
        const startShift = shifts[i + 1];
        const cashierId = endShift.user_id;
        const cashierName = endShift.user.fullname;

        if (startShift.shift !== 'start' || endShift.shift !== 'end') {
          console.log(`Skipping incomplete pair at index ${i}`, { startShift, endShift });
          continue;
        }

        const shiftValueDifference = endShift.value - startShift.value;

        const transactions = await prisma.transaction.findMany({
          where: {
            cashier_on_duty: cashierId,
            transaction_date: {
              gte: startShift.created_at,
              lt: endShift.created_at,
            },
          },
        });

        let totalCash = 0;
        let totalDebit = 0;

        transactions.forEach((transaction) => {
          if (transaction.payment_type === 'cash') {
            totalCash += transaction.total_price;
          } else if (transaction.payment_type === 'debit') {
            totalDebit += transaction.total_price;
          }
        });

        let totalIncome = totalCash + totalDebit
        
        if (!shiftData[cashierName]) shiftData[cashierName] = [];
        shiftData[cashierName].push({
          startShiftTime: format(new Date(startShift.created_at), 'yyyy-MM-dd HH:mm:ss'),
          endShiftTime: format(new Date(endShift.created_at), 'yyyy-MM-dd HH:mm:ss'),
          startShiftValue: formatToRupiah(startShift.value),
          endShiftValue: formatToRupiah(endShift.value),
          shiftValueDifference: formatToRupiah(shiftValueDifference),
          totalCash: formatToRupiah(totalCash),
          totalDebit: formatToRupiah(totalDebit),
          totalIncome: formatToRupiah(totalIncome),
          match: (totalIncome === shiftValueDifference)
        });
      }

      res.status(200).json(shiftData);
    } catch (error) {
      console.error('Error in getDataEachShift:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
