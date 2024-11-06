import { CashierShiftController } from "@/controllers/cashiershift.controller"
import { AuthMiddleware } from "@/middleware/auth.middleware"
import { Router } from "express"


export class CashierShiftRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private cashierShiftController: CashierShiftController

    constructor() {
        this.cashierShiftController = new CashierShiftController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.post('/', this.authMiddleware.verifyToken, this.cashierShiftController.createShiftData)
    }

    getRouter(): Router {
        return this.router
    }
}