import { TransactionController } from "@/controllers/transaction.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class TransactionRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private transactionController: TransactionController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.transactionController = new TransactionController()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/', this.authMiddleware.verifyToken, this.transactionController.getAllTransactions)
        this.router.get('/by-date', this.authMiddleware.verifyToken, this.transactionController.getAllTransactionsByDate); 
        this.router.post('/', this.authMiddleware.verifyToken, this.transactionController.createTransaction)
    }

    getRouter() : Router {
       return this.router 
    }
}