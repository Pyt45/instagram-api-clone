import { Request, Response } from 'express';
import pg from 'pg';
import { Connect } from '../connect.db';
import { User } from '../interfaces/user';
import * as bcrypt from 'bcrypt';

export class UserController {
    private static usercontroller: UserController;
    private pool: pg.Pool;

    constructor() {
        this.pool = Connect.getInstance().getPool();
    }

    public static getInstance(): UserController {
        if (!UserController.usercontroller)
            UserController.usercontroller = new UserController();
        return UserController.usercontroller;
    }

    /**
     * 
     * @param user user
     * @returns string
     */
    public register = (req: Request, res: Response) => {
        const user: User = req.body;
        if (!user) return res.status(403).json({ err: 'empty data' });
        // if (!validateData(user)) return res.status(403).json({err: 'invalid data'});
        this.pool.query('SELECT * FROM users WHERE \
            username = $1 or email = $2', [`${user.username}`, `${user.email}`])
        .then((row) => {
            if (row.rowCount> 0) return res.status(403).json({ err: 'user already exists' });
            const salt = 10;
            bcrypt.hash(user.password, salt)
            .then((hashed) => {
                this.pool.query('INSERT INTO users (firstname, lastname, \
                    username, email, ppassword) VALUES ($1, $2, $3, $4, $5)', [user.firstname, user.lastname, user.username, user.email, hashed])
                    .then((row) => {
                        // TODO: send an email to verify the account
                        return res.status(201).json({
                            msg: 'an email has been sent to your email account, \
                            please check your email'
                        });
                    }).catch(err => res.json({ err: err.message, index: 2 }));
            });
        }).catch((err) => {
            return res.json({ err: err.message, index: 3 });
        });
    }

    /**
     * 
     * @param req Request
     * @param res Response
     * @returns token
     */
    public login = (req: Request, res: Response) => {
    }

    public findAll = async (req: Request, res: Response) => {
        try {
            const users = await this.pool.query('SELECT * FROM users');
            res.status(200).send(users.rows);
        } catch (err: any) {
            console.log(err);
        }
    }
};