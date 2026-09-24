import { PRODUCT_STATUS } from '../constants/index.js';

export class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts(onlyAvailable = false) {
        const filter = {};
        if (onlyAvailable) {
            filter.status = PRODUCT_STATUS.AVAILABLE;
        }
        return await this.productRepository.findAll(filter);
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

    async createProduct(data) {
        if (!data.name || data.price <= 0) {
            throw new Error('El nombre y un precio mayor a 0 son obligatorios');
        }
        data.status = data.stock > 0 ? PRODUCT_STATUS.AVAILABLE : PRODUCT_STATUS.OUT_OF_STOCK;
        return await this.productRepository.create(data);
    }
}