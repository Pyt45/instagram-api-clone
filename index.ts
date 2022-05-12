// import winston from 'winston';
// import helmet from 'helmet';
// import passport from 'passport';
// import { Strategy as FacebookStrategy } from 'passport-facebook';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import { App } from "./app"

const bootstrap = async () => {
    const app: App = App.getApp();

    app.runApi();
}

bootstrap();
