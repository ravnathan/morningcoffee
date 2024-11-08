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
              cold_only: true,
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

  async getProductsByCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.query;
  
      if (!categoryName) throw ('Category name is required')
        
      const products = await prisma.product.findMany({
        where: {
          is_deleted: false,
          category: {
            name: categoryName as string,
          },
        },
        include: {
          category: {
            select: {
              hot_iced_variant: true,
              cold_only: true,
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
        image_1?: Express.Multer.File[];
        image_2?: Express.Multer.File[];
      };

      const image_1 = files.image_1 && files.image_1.length > 0 ? `${base_url}/public/products/${files.image_1[0].filename}` : null;

      const image_2 = files.image_2 && files.image_2.length > 0 ? `${base_url}/public/products/${files.image_2[0].filename}` : null;

      const iced_small = parseInt(productData.iced_small);
      const iced_medium = parseInt(productData.iced_medium);
      const iced_large = parseInt(productData.iced_large);

      const product = await prisma.product.create({
        data: {
          ...productData,
          medium: parseInt(productData.medium),
          ...(image_1 && { image_1 }),
          ...(image_2 && { image_2 }),
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
