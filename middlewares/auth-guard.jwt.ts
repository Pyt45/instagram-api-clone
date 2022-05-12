import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { isEmpty } from '../utils/is.empty';

dotenv.config();


export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        if (!req.headers['authorization'])
            return reject(new Error('header not found'));
        const token = req.headers['authorization'].split(' ')[1];
        if (isEmpty(token))
            return reject(new Error('token is empty'));
        jwt.verify(token, `${process.env.JWT_SECRET}`, (err, payload) => {
            if (err) return reject(err);
            req.user = payload;
            return resolve(next());
        });
    });
};