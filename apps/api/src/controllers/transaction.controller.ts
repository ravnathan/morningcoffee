import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          TransactionItem: {
            include: {
              product: true,
            },
          },
        },
      });

      const formattedTransactions = transactions.map((transaction) => ({
        id: transaction.id,
        total_price: transaction.total_price,
        transaction_date: transaction.transaction_date,
        TransactionItems: transaction.TransactionItem.map((item) => ({
          productName: item.product.name,
          qty: item.qty,
          priceSummary: item.qty * item.product.price_medium!,
        })),
      }));

      res.status(200).send({
        formattedTransactions,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
