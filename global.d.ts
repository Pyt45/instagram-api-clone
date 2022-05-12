declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BACKEND_PORT?: string;
            FRONTEND_URL?: string;
            MONGO_URL?: string;
            JWT_SECRET?: string;
            FACEBOOK_CLIENT_ID?: string;
            FACEBOOK_CLIENT_SECRET?: string;
            GOOGLE_CLIENT_ID?: string;
            GOOGLE_CLIENT_SECRET?: string;
        }
    }
}