import { Schema, model } from "mongoose";

interface User {
    firstname?: string;
    lastname?: string;
    username: string;
    email: string;
    birthday?: Date
    password?: string;
    avatar: string;
    status?: string;
    followers?: [];
    following?: [];
}
const schema = new Schema<User>({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    birthday: {
        type: Date,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'offline'
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    }
});

export const UserModel = model<User>('User', schema);