import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const { items } = req.body;

    try {
      let totalPrice = 0;
      
      const transactionItemsData = await Promise.all(
        items.map(async (item: { product_id: string; qty: number; variant: string }) => {
          const product = await prisma.product.findUnique({
            where: { id: item.product_id },
          });
          console.log(product);
          
          if (!product) {
            throw new Error(`Product with ID ${item.product_id} not found`);
          }

          const price =
            item.variant === 'iced_small' ? product.iced_small :
            item.variant === 'iced_medium' ? product.iced_medium :
            item.variant === 'iced_large' ? product.iced_large :
            product.medium ?? 0; 

          if (price === null) {
            throw new Error(`Price for variant ${item.variant} is not set for product ID ${item.product_id}`);
          }

          const itemTotalPrice = price * item.qty;
          totalPrice += itemTotalPrice;

          return {
            product: {
              connect: { id: item.product_id },
            },
            qty: item.qty,
            variant: item.variant,
            price,
            total_price: itemTotalPrice,
          };
        })
      );

      const transaction = await prisma.transaction.create({
        data: {
          cashier_on_duty: req.user.id,
          total_price: totalPrice,
          TransactionItem: {
            create: transactionItemsData,
          },
        },
        include: {
          TransactionItem: {
            include: {
              product: true, 
            },
          },
        },
      });

      res.status(201).send({
        transaction,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getAllTransactions(req: Request, res: Response) {
    try {
      const existingTransactions = await prisma.transaction.findMany({
        include: {
          TransactionItem: {
            include: {
              product: true, 
            },
          },
        },
      });

      const transactions = existingTransactions.map(transaction => ({
        id: transaction.id,
        total_price: transaction.total_price,
        cashier_on_duty: transaction.cashier_on_duty,
        transaction_date: transaction.transaction_date,
        transaction_items: transaction.TransactionItem.map(item => ({
          product_id: item.product_id,
          qty: item.qty,
          variant: item.variant,
          price: item.price,
          total_price: item.total_price,
          product_name: item.product.name,
        })),
      }));

      res.status(200).json({
        transactions
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
