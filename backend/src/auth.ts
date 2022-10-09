import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader: string = req.headers.authorization || '';
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(403).send("please preform login ! you dont have access token");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');
        // req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
