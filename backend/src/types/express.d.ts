import 'express';
export declare module 'express-serve-static-core' {
    interface Request {
        userId?: any; 
    }
}

export interface AuthenticatedRequest extends Request {
    userId?: number;
}