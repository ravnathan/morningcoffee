import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

const base_url = process.env.BASE_URL

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        where: { isDeleted: false },
      });

      return res.status(200).send({
        status: 'ok',
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
  
      if (!categoryExists) throw 'Category does not exist';

      const productExists = await prisma.product.findUnique({
        where: { name: productData.name },
      });
  
      if (productExists) throw 'The product already exists';

      const image_hot = `${base_url}/public/products/${req.file?.filename}`;
      const image_cold = req.body.image_cold ? `${base_url}/public/products/${req.body.image_cold}` : null;
      const price_S = parseInt(productData.price_S)
      const price_L = parseInt(productData.price_L)
  
      const product = await prisma.product.create({
        data: {
          ...productData,
          category_name, 
          image_hot,
          price_M: parseInt(productData.price_M),
          ...(image_cold && { image_cold }), 
          ...(price_S && {price_S}),
          ...(price_L && {price_L}),
          stock: parseInt(productData.stock)
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
      if (product.isDeleted == true) throw 'Product was already deleted';

      await prisma.product.update({
        where: { id: product.id },
        data: { isDeleted: true },
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
