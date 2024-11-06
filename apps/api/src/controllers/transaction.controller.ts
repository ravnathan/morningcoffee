import { hashData } from '@/helpers/hashData';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const { items, debit_info } = req.body;

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
            item.variant === 'S' ? product.iced_small :
            item.variant === 'M' ? product.iced_medium :
            item.variant === 'L' ? product.iced_large :
            product.medium

       

          const itemTotalPrice = price! * item.qty;
          totalPrice += itemTotalPrice;

          return {
            product: {
              connect: { id: item.product_id },
            },
            qty: item.qty,
            variant: (item.variant ? item.variant : 'normal'),
            price,
            total_price: itemTotalPrice,
          };
        })
      );

      const transaction = await prisma.transaction.create({
        data: {
          cashier_on_duty: req.user.id,
          payment_type: req.body.payment_type,
          debit_info: debit_info ? await hashData(debit_info) : null,
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
        status: 'ok',
        msg: 'Transaction Success',
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
          user: true
        },
      });
  
      const transactions = existingTransactions.map(transaction => ({
        id: transaction.id,
        total_price: transaction.total_price,
        cashier_on_duty: transaction.cashier_on_duty,
        cashier_fullname: transaction.user.fullname,
        transaction_date: transaction.transaction_date,
        payment_type: transaction.payment_type, 
        transaction_items: transaction.TransactionItem.map(item => ({
          product_id: item.product_id,
          qty: item.qty,
          variant: item.variant,
          price: item.price,
          total_price: item.total_price,
          product_name: item.product.name,
          product_image_1: item.product.image_1,
          product_image_2: item.product.image_2 
        })),
      }));
  
      return res.status(200).send({
        transactions
      })
    } catch (error) {
      responseError(res, error)
    }
  }


async getAllTransactionsByDate(req: Request, res: Response) {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).send({ error: 'Date parameter is required' });
    }

    const parsedDate = parseISO(date as string);
    const startDate = startOfDay(parsedDate);
    const endDate = endOfDay(parsedDate);

    const existingTransactions = await prisma.transaction.findMany({
      where: {
        transaction_date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        TransactionItem: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    const transactions = existingTransactions.map(transaction => ({
      id: transaction.id,
      total_price: transaction.total_price,
      cashier_on_duty: transaction.cashier_on_duty,
      cashier_fullname: transaction.user.fullname,
      transaction_date: transaction.transaction_date,
      payment_type: transaction.payment_type,
      transaction_items: transaction.TransactionItem.map(item => ({
        product_id: item.product_id,
        qty: item.qty,
        variant: item.variant,
        price: item.price,
        total_price: item.total_price,
        product_name: item.product.name,
        product_image_1: item.product.image_1,
        product_image_2: item.product.image_2,
      })),
    }));

    return res.status(200).send({ transactions });
  } catch (error) {
    responseError(res, error);
  }
}

  
}
