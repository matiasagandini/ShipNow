import { UserModel } from '../models/User.js';

export class UserRepository {
    async findAll() {
        return await UserModel.find().select('-__v').lean();
    }

    async findById(id) {
        return await UserModel.findById(id).select('-__v');
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email }).select('-__v');
    }

    async create(userData) {
        return await UserModel.create(userData);
    }
}