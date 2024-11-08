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
            item.variant === 'S'
              ? product.iced_small
              : item.variant === 'M'
                ? product.iced_medium
                : item.variant === 'L'
                  ? product.iced_large
                  : product.medium;
  
          const itemTotalPrice = price! * item.qty;
          totalPrice += itemTotalPrice;
  
          if (item.variant === 'S' || item.variant === 'M' || item.variant === 'L') {
            if (product.stock_iced === null || product.stock_iced < item.qty) {
              throw new Error(`Not enough stock for iced variant of product with ID ${item.product_id}`);
            }
            await prisma.product.update({
              where: { id: item.product_id },
              data: {
                stock_iced: product.stock_iced - item.qty,
              },
            });
          } else {
            if (product.stock === null || product.stock < item.qty) {
              throw new Error(`Not enough stock for product with ID ${item.product_id}`);
            }
            await prisma.product.update({
              where: { id: item.product_id },
              data: {
                stock: product.stock - item.qty,
              },
            });
          }
  
          return {
            product: {
              connect: { id: item.product_id },
            },
            qty: item.qty,
            variant: item.variant ? item.variant : 'normal',
            price,
            total_price: itemTotalPrice,
          };
        }),
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
          user: true,
        },
        orderBy: {
          transaction_date: 'desc',
        },
      });

      const transactions = existingTransactions.map((transaction) => ({
        id: transaction.id,
        total_price: transaction.total_price,
        cashier_on_duty: transaction.cashier_on_duty,
        cashier_fullname: transaction.user.fullname,
        transaction_date: transaction.transaction_date,
        payment_type: transaction.payment_type,
        transaction_items: transaction.TransactionItem.map((item) => ({
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

      return res.status(200).send({
        transactions,
      });
    } catch (error) {
      responseError(res, error);
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

      const transactions = existingTransactions.map((transaction) => ({
        id: transaction.id,
        total_price: transaction.total_price,
        cashier_on_duty: transaction.cashier_on_duty,
        cashier_fullname: transaction.user.fullname,
        transaction_date: transaction.transaction_date,
        payment_type: transaction.payment_type,
        transaction_items: transaction.TransactionItem.map((item) => ({
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

  async getAllTransactionsByProd(req: Request, res: Response) {
    try {
      const { product } = req.query;

      if (!product) throw 'No search can be performed';

      const normalizedProduct = (product as string).trim().toLowerCase();
      const transactions = await prisma.transaction.findMany({
        where: {
          TransactionItem: {
            some: {
              product: {
                name: {
                  contains: normalizedProduct.toLowerCase(),
                },
              },
            },
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

      const mappedTransactions = transactions.map((transaction) => ({
        id: transaction.id,
        total_price: transaction.total_price,
        cashier_on_duty: transaction.cashier_on_duty,
        cashier_fullname: transaction.user.fullname,
        transaction_date: transaction.transaction_date,
        payment_type: transaction.payment_type,
        transaction_items: transaction.TransactionItem.map((item) => ({
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

      if (mappedTransactions.length === 0) throw 'No result';

      return res.status(200).send({ transactions: mappedTransactions });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getTransactionDataByDay(req: Request, res: Response) {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          TransactionItem: {
            include: {
              product: true,
            },
          },
          user: true,
        },
        orderBy: {
          transaction_date: 'desc',
        },
      });

      let transactionDataByDay: {
        [date: string]: {
          totalTransactions: number;
          totalAmount: number;
          cash: { count: number; amount: number };
          debit: { count: number; amount: number };
          soldItems: { [variant: string]: { name: string; variant: string; qty: number; totalPrice: number } };
        };
      } = {};

      transactions.forEach((transaction) => {
        const date = transaction.transaction_date.toISOString().split('T')[0];

        if (!transactionDataByDay[date]) {
          transactionDataByDay[date] = {
            totalTransactions: 0,
            totalAmount: 0,
            cash: { count: 0, amount: 0 },
            debit: { count: 0, amount: 0 },
            soldItems: {},
          };
        }

        transactionDataByDay[date].totalTransactions += 1;
        transactionDataByDay[date].totalAmount += transaction.total_price;

        if (transaction.payment_type === 'cash') {
          transactionDataByDay[date].cash.count += 1;
          transactionDataByDay[date].cash.amount += transaction.total_price;
        } else if (transaction.payment_type === 'debit') {
          transactionDataByDay[date].debit.count += 1;
          transactionDataByDay[date].debit.amount += transaction.total_price;
        }

        transaction.TransactionItem.forEach((item) => {
          const itemTotalPrice = item.price * item.qty;

          if (!transactionDataByDay[date].soldItems[item.variant]) {
            transactionDataByDay[date].soldItems[item.variant] = {
              name: item.product.name,
              variant: item.variant,
              qty: 0,
              totalPrice: 0,
            };
          }

          transactionDataByDay[date].soldItems[item.variant].qty += item.qty;
          transactionDataByDay[date].soldItems[item.variant].totalPrice += itemTotalPrice;
        });
      });

      const formattedData = Object.entries(transactionDataByDay).map(([date, data]) => ({
        date,
        totalTransactions: data.totalTransactions,
        totalAmount: data.totalAmount,
        cash: {
          count: data.cash.count,
          amount: data.cash.amount,
        },
        debit: {
          count: data.debit.count,
          amount: data.debit.amount,
        },
        soldItems: Object.values(data.soldItems),
      }));

      return res.status(200).send(formattedData);
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}
