export class MockController {
    constructor(mockService) {
        this.mockService = mockService;
    }

    getMockUsers = async (req, res) => {
        try {
            const qty = parseInt(req.query.qty, 10) || 10;
            const role = req.query.role;
            const users = this.mockService.generateMockUsers(qty, role);
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    };

    getMockOrders = async (req, res) => {
        try {
            const qty = parseInt(req.query.qty, 10) || 10;
            const orders = this.mockService.generateMockOrders(qty);
            return res.status(200).json({ status: 'success', payload: orders });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    };

    seedDatabase = async (req, res) => {
        try {
            const qty = parseInt(req.query.qty, 10) || 10;
            const result = await this.mockService.seedDatabase(qty);
            return res.status(201).json({ status: 'success', payload: result });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    };
}