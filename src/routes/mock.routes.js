import { Router } from 'express';
import { MockRepository } from '../repositories/mock.repository.js';
import { MockService } from '../services/mock.service.js';
import { MockController } from '../controllers/mock.controller.js';

const router = Router();

const mockRepository = new MockRepository();
const mockService = new MockService(mockRepository);
const mockController = new MockController(mockService);

// GET /api/mocks/users?qty=5&role=CLIENTE -> Devuelve mocks sin guardar
router.get('/users', mockController.getMockUsers);

// GET /api/mocks/orders?qty=5 -> Devuelve pedidos simulados sin guardar
router.get('/orders', mockController.getMockOrders);

// POST /api/mocks/seed?qty=10 -> Inserta usuarios, pedidos y entregas en MongoDB
router.post('/seed', mockController.seedDatabase);

export default router;