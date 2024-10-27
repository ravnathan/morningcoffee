type User = {
    id: number
    role: string
}

declare namespace Express {
    export interface Request {
        user: User
    }
}

declare namespace Express {
    export interface Request {
        file?: Multer.File
    }
}