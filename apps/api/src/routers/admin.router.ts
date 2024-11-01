import { AdminController } from "@/controllers/admin.controller";
import { uploader } from "@/helpers/uploader";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AdminRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private adminController: AdminController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.adminController = new AdminController()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/cashier', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.adminController.getAllCashier)
        this.router.post('/cashier', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, uploader('avatar', '/avatar').single('avatar'), this.adminController.createCashier)
        this.router.patch('/cashier', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.adminController.editCashier)
        this.router.delete('/cashier', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.adminController.deleteCashier)
    }

    getRouter(): Router {
        return this.router
    }
}