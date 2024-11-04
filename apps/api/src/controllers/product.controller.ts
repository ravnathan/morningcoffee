import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

const base_url = process.env.BASE_URL;

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        where: { is_deleted: false },
        include: {
          category: {
            select: {
              hot_iced_variant: true,
            },
          },
        },
      });

      return res.status(200).send({
        products,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const { category_name, ...productData } = req.body;

      const categoryExists = await prisma.category.findUnique({
        where: { name: category_name },
      });

      if (!categoryExists) throw new Error('Category does not exist');

      const productExists = await prisma.product.findUnique({
        where: { name: productData.name },
      });

      if (productExists) throw new Error('The product already exists');

      const files = req.files as {
        image_hot?: Express.Multer.File[];
        image_iced?: Express.Multer.File[];
      };

      const image_hot =
        files.image_hot && files.image_hot.length > 0
          ? `${base_url}/public/products/${files.image_hot[0].filename}`
          : null;

      const image_iced =
        files.image_iced && files.image_iced.length > 0
          ? `${base_url}/public/products/${files.image_iced[0].filename}`
          : null;

      const iced_small = parseInt(productData.iced_small);
      const iced_medium = parseInt(productData.iced_medium);
      const iced_large = parseInt(productData.iced_large);

      const product = await prisma.product.create({
        data: {
          ...productData,
          image_hot,
          medium: parseInt(productData.medium),
          ...(image_iced && { image_iced }),
          ...(iced_small && { iced_small }),
          ...(iced_medium && { iced_medium }),
          ...(iced_large && { iced_large }),
          stock: parseInt(productData.stock),
          stock_iced: parseInt(productData.stock_iced),
          category: {
            connect: {
              name: categoryExists.name,
            },
          },
        },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Product created',
        product,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async editProduct(req: Request, res: Response) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.body.id },
      });

      if (!product) throw "Product doesn't exist";

      const editedProduct = await prisma.product.update({
        where: { id: product.id },
        data: { ...req.body },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Product data has been updated',
        editedProduct,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.body.id },
      });

      if (!product) throw "Product doesn't exist";
      if (product.is_deleted == true) throw 'Product was already deleted';

      await prisma.product.update({
        where: { id: product.id },
        data: { is_deleted: true },
      });

      return res.status(200).send({
        status: 'ok',
        msg: 'Product data has been deleted',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
