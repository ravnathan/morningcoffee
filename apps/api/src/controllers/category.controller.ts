import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

const base_url = process.env.BASE_URL;

export class CategoryController {
  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        where: { is_deleted: false },
      });

      return res.status(200).send({
        status: 'ok',
        categories,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createCategory(req: Request, res: Response) {
    try {
      const category = await prisma.category.findUnique({
        where: { name: req.body.name },
      });

      if (category) throw 'Category has already existed';

      const image = `${base_url}/public/categories/${req.file?.filename}`;

      const newCategory = await prisma.category.create({
        data: {
          ...req.body,
          image,
        },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Category has been created',
        newCategory,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async editCategory(req: Request, res: Response) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: req.body.id },
      });

      if (!category) throw "Category doesn't exist";

      const editedCategory = await prisma.category.update({
        where: { id: category.id },
        data: { ...req.body },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Category has beed changed',
        editedCategory,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const category = await prisma.category.findUnique({
        where: { id: req.body.id },
      });

      if (!category) throw "Category doesn't exist";

      const deletedCategory = await prisma.category.update({
        where: { id: category.id },
        data: { is_deleted: true },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Category has beed deleted',
        deletedCategory,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
