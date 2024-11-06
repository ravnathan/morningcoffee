import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRouter {
    private router: Router
    private authController: AuthController
    private authMiddleware: AuthMiddleware

    constructor() {
        this.authController = new AuthController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/user', this.authMiddleware.verifyToken, this.authController.userData)
        this.router.post('/login', this.authController.userLogin)
    }

    getRouter(): Router {
        return this.router
    }
}