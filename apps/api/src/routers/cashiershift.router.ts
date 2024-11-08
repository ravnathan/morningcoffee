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
        this.router.get('/', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.cashierShiftController.getShiftData)
        this.router.get('/details', this.authMiddleware.verifyToken, this.authMiddleware.checkAdmin, this.cashierShiftController.getDataEachShift)
        this.router.post('/', this.authMiddleware.verifyToken, this.cashierShiftController.createShiftData)
    }

    getRouter(): Router {
        return this.router
    }
}