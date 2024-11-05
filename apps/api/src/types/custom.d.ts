import { Request } from 'express';
import { File as MulterFile } from 'multer';

type User = {
  id: string;
  role: string;
};

interface MulterFiles {
  product?: MulterFile[];
  image_2?: MulterFile[];
}

declare global {
  namespace Express {
    interface Request {
      user: User;
      file?: MulterFile;
      files?: MulterFiles;
    }
  }
}
