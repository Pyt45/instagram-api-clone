import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload: jwt.JwtPayload | string): Promise<string | undefined> => {
    // try {
    //     const token = await jwt.sign(payload, `${process.env.JWT_SECRET}`);
    //     return token;
    // } catch (err) {
    //     console.log(err);
    // }
    return new Promise((resolve, reject) => {
        jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '30min' }, (err, token) => {
            if (err) return reject(err);
            return resolve(token);
        });
    });
}