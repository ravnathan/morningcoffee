import { CategoryController } from "@/controllers/category.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class CategoryRouter {
    private router: Router
    private categoryController: CategoryController
    private authMiddleware: AuthMiddleware

    constructor() {
        this.categoryController = new CategoryController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/', this.categoryController.getCategories)
        // this.router.post('/', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.categoryController.createCategory)
        this.router.patch('/', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.categoryController.editCategory)
        this.router.patch('/soft', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.categoryController.deleteCategory)
    }

    getRouter(): Router {
        return this.router
    }
}