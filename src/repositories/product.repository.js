import { ProductModel } from '../models/Product.js';

export class ProductRepository {
    async findAll(filter = {}) {
        return await ProductModel.find(filter).select('-__v').lean();
    }

    async findById(id) {
        return await ProductModel.findById(id).select('-__v');
    }

    async create(productData) {
        return await ProductModel.create(productData);
    }

    async update(id, updateData) {
        return await ProductModel.findByIdAndUpdate(id, updateData, { new: true }).select('-__v');
    }

    async delete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}