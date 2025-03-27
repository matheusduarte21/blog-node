import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
export const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: 'Token não fornecido' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};
