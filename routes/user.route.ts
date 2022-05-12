import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller';

// export class UserRoute {
//     // private static userroute: UserRoute;
//     public route: Router;
//     // private pool: pg.Pool;
//     // private usercontroller: UserController;
//     // private route: any;

//     constructor() {
//         // this.pool = pl;
//         this.route = express.Router();
//         // this.usercontroller = new UserController();
//         // this.usercontroller = UserController.getInstance(pl);
//         // this.route = express.Router();
//     }

//     // public static getRoute(): Router {
//     //     if (!UserRoute.route)
//     //         UserRoute.route = new UserRoute();
//     //     return UserRoute.route;
//     // }
//     public handleUserRoute() {
//         // const route = express.Router();
//         const usercontroller = new UserController();
//         this.route.get('/', usercontroller.findAll);
//         // route.post('/register', (req: Request, res: Response) => {
//         //     if (typeof req.body.user === 'undefined')
//         //         return res.json({
//         //             err: 'invalid data'
//         //         });
//         //     // body must be validated
//         //     const user: User = req.body;
//         //     return usercontroller.register(user)
//         //             .then((message) => {
//         //                 return res.status(200).send(message);
//         //             }).catch((err) => {
//         //                 return res.json({
//         //                     err
//         //                 });
//         //             });
//         // });
//     };
// };

const instance = UserController.getInstance();
const router = express.Router();

router.get('/', instance.findAll);
router.post('/register', instance.register);
router.post('/login', instance.login);
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/update-profile', instance.uploadAvatar)
// router.post('/reset-password/:token', instance.uploadAvatar)
// router.post('/reset-email/:token', instance.uploadAvatar)

// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)
// router.post('/upload-profile-pic', instance.uploadAvatar)

export { router as UserRoute }