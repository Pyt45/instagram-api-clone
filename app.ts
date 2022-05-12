import express, { Application, Response } from "express";
import pg from 'pg';
import https from "https";
import { WebSocket } from "./provider/web.socket";
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import cookieParser from "cookie-parser";
import { UserRoute } from "./routes/user.route";
// import { AdminRoute } from "./routes/admin.route";
// import { ChatRoute } from "./routes/chat.route";
// import { CommentRoute } from "./routes/comment.route";
// import { LikeRoute } from "./routes/like.route";
// import { PostRoute } from "./routes/post.route";
// import { RelationshipRoute } from "./routes/relationship.route";

dotenv.config();

const options = {
    key: fs.readFileSync('./ssl/server.key', 'utf8'),
    cert: fs.readFileSync('./ssl/server.cert', 'utf8')
}

export class App {
    private static app: App;
    private server: https.Server;
    private serverApp: Application;
    private io: any;

    private constructor() {
        this.serverApp = express();
        this.server = https.createServer(options, this.serverApp);
        this.io = WebSocket.getInstance(this.server);

        this.serverApp.use(express.json());
        this.serverApp.use(cookieParser());
        this.serverApp.use(cors({
            origin: '*'
        }));
        this.server.listen(process.env.BACKEND_PORT, (): void => {
            console.log(`Connected successfully on port ${process.env.BACKEND_PORT}`);
        });
    }

    public static getApp(): App {
        if (!App.app)
            App.app = new App();
        return App.app;
    }
    public runApi(): void {
        this.serverApp.use('/api', UserRoute);
        // this.serverApp.use('/api', AdminRoute);
        // this.serverApp.use('/api', ChatRoute);
        // this.serverApp.use('/api', CommentRoute);
        // this.serverApp.use('/api', LikeRoute);
        // this.serverApp.use('/api', PostRoute);
        // this.serverApp.use('/api', RelationshipRoute);
    }
}