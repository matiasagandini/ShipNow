import { Schema, model } from 'mongoose';
import { ROLES } from '../constants/index.js';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        }
    },
    { timestamps: true }
);

export const UserModel = model('User', userSchema);