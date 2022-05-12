import { Server } from 'socket.io';
import https from "https";

const WEBSOCKET_CORS = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', "PATCH"]
};

export class WebSocket extends Server {
    private static io: WebSocket;

    constructor(httpsServer: https.Server) {
        super(httpsServer, {
            cors: WEBSOCKET_CORS
        });
    }

    public static getInstance(httpsServer?: any): WebSocket {
        if (!WebSocket.io) {
            WebSocket.io = new WebSocket(httpsServer);
        }

        return WebSocket.io;
    }
}