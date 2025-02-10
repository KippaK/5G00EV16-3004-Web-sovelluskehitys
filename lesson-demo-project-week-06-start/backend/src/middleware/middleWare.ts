import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from "../config/config";
import { nextTick } from "process";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            res.status(401).json({ message: 'Auth fail: No token' })
            return
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({})
            return
        }

        const decodedToken = jwt.verify(token, config.JWT_KEY) as JwtPayload;
        if (!decodedToken || typeof decodedToken !== 'object' || !decodedToken.id) {
            res.status(401).json({ })
            return
        }

        // req.userData = { userId: decodedToken.id }
        next();
        
    } catch (error) {
        
    }
}