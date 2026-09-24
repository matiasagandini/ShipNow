export class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    getProducts = async (req, res) => {
        try {
            const { available } = req.query;
            const products = await this.productService.getAllProducts(available === 'true');
            return res.status(200).json({ status: 'success', payload: products });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    };

    getProductById = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await this.productService.getProductById(id);
            return res.status(200).json({ status: 'success', payload: product });
        } catch (error) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            const newProduct = await this.productService.createProduct(req.body);
            return res.status(201).json({ status: 'success', payload: newProduct });
        } catch (error) {
            return res.status(400).json({ status: 'error', message: error.message });
        }
    };
}