import { hashData } from '@/helpers/hashData';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

const base_url = process.env.BASE_URL;

export class AdminController {
  async getAllCashier(req: Request, res: Response) {
    try {
      const cashiersData = await prisma.user.findMany({
        where: { role: 'cashier' },
        // select: {
        //   username: true,
        //   fullname: true,
        //   role: true,
        //   avatar: true,
        //   created_at: true,
        //   updated_at: true
        // }
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
      const { password, ...data } = req.body;
      const existingCashiersCount = await prisma.user.count({
        where: { role: 'cashier' },
      });

      const newUsername = `cashier${existingCashiersCount + 1}`;

      const existingCashier = await prisma.user.findUnique({
        where: { username: newUsername },
      });

      if (existingCashier) throw 'User has already existed';

      const hashedPassword = await hashData(password);
      console.log(password);

      const avatar = `${base_url}/public/avatar/${req.file?.filename}`;

      const cashier = await prisma.user.create({
        data: {
          ...data,
          username: newUsername,
          password: hashedPassword,
          role: 'cashier',
          avatar,
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
      const { password, ...data } = req.body;
      const cashierData = await prisma.user.findUnique({
        where: { username: data.username },
      });

      if (!cashierData) throw 'No user found';
      const updateData: any = { ...data };
      if (password) {
        const hashedPassword = await hashData(password);
        updateData.password = hashedPassword;
      }

      const newData = await prisma.user.update({
        where: { username: cashierData.username },
        data: updateData,
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
    try {
      await prisma.user.delete({
        where: { id: req.body.id },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Cashier data has been deleted',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
