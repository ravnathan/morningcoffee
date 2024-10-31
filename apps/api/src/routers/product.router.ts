import { ProductController } from "@/controllers/product.controller";
import { uploader } from "@/helpers/uploader";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class ProductRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private productController: ProductController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.productController = new ProductController()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/', this.productController.getAllProducts)
        this.router.post('/', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin,  uploader('product', '/products').fields([{ name: 'product', maxCount: 1 },{ name: 'image_iced', maxCount: 1 }]), this.productController.createProduct)
        this.router.patch('/', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, uploader('product', '/products').single('product'), this.productController.editProduct)
        this.router.patch('/soft', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.productController.deleteProduct)
    }

    getRouter(): Router {
        return this.router
    }
}