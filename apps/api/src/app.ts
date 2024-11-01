import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { AdminRouter } from './routers/admin.router';
import { ProductRouter } from './routers/product.router';
import { CategoryRouter } from './routers/categories.router';
import path from 'path'
import { TransactionRouter } from './routers/transaction.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public', express.static(path.join(__dirname, '../public')))
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter()
    const adminRouter = new AdminRouter()
    const productRouter = new ProductRouter()
    const categoryRouter = new CategoryRouter()
    const transactionRouter = new TransactionRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Welcome to Morning Coffee`);
    });
    
    this.app.use('/api/auth', authRouter.getRouter())
    this.app.use('/api/admin', adminRouter.getRouter())
    this.app.use('/api/product', productRouter.getRouter())
    this.app.use('/api/category', categoryRouter.getRouter())
    this.app.use('/api/transaction', transactionRouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
