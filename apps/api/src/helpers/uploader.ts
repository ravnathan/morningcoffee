import path from 'path';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, fileName: string) => void;

export const uploader = (
    filePrefix: string,
    folderName?: string,
    filelimit?: number,
) => {
    const defaultDir = path.join(__dirname, '../../public');

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback,
    ) => {
        const extAllowed = /\.(jpg|png|jpeg|webp)$/;
        const isExMatch = file.originalname.toLocaleLowerCase().match(extAllowed);
        if (isExMatch) {
            cb(null, true);
        } else {
            const error = new Error('Your file extension is denied');
            cb(error);
        }
    };

    const storage = multer.diskStorage({
        destination: (
            req: Request,
            file: Express.Multer.File,
            cb: DestinationCallback,
        ) => {
            const destination = folderName ? defaultDir + folderName : defaultDir;
            cb(null, destination);
        },
        filename: (
            req: Request,
            file: Express.Multer.File,
            cb: FileNameCallback,
        ) => {
            const originalNameParts = file.originalname.split('.');
            const fileExtension = originalNameParts[originalNameParts.length - 1];
            const newFileName = filePrefix + Date.now() + '.' + fileExtension;
            cb(null, newFileName);
        },
    });
    const limits = { fileSize: filelimit || 6 * 1024 * 1024 };
    return multer({ storage: storage, fileFilter: fileFilter, limits });
};