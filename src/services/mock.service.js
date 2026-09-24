import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { ROLES, ORDER_STATUS, ORDER_PRIORITY, DELIVERY_STATUS } from '../constants/index.js';

export class MockService {
    constructor(mockRepository) {
        this.mockRepository = mockRepository;
    }

    // Genera usuarios simulados (Clientes o Repartidores)
    generateMockUsers(qty = 10, role = null) {
        const users = [];
        for (let i = 0; i < qty; i++) {
            const selectedRole = role && Object.values(ROLES).includes(role)
                ? role
                : faker.helpers.arrayElement([ROLES.CLIENTE, ROLES.REPARTIDOR]);

            users.push({
                _id: new mongoose.Types.ObjectId().toString(),
                name: faker.person.fullName(),
                email: faker.internet.email().toLowerCase(),
                role: selectedRole,
                createdAt: faker.date.recent()
            });
        }
        return users;
    }

    // Genera pedidos simulados asociados a un listado de usuarios
    generateMockOrders(qty = 5, userIds = []) {
        const orders = [];
        for (let i = 0; i < qty; i++) {
            const userId = userIds.length > 0
                ? faker.helpers.arrayElement(userIds)
                : new mongoose.Types.ObjectId().toString();

            const items = Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => ({
                productName: faker.commerce.productName(),
                quantity: faker.number.int({ min: 1, max: 5 }),
                price: parseFloat(faker.commerce.price({ min: 10, max: 200 }))
            }));

            const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            orders.push({
                _id: new mongoose.Types.ObjectId().toString(),
                user: userId,
                products: items,
                total: parseFloat(total.toFixed(2)),
                status: faker.helpers.arrayElement(Object.values(ORDER_STATUS)),
                priority: faker.helpers.arrayElement(Object.values(ORDER_PRIORITY)),
                createdAt: faker.date.recent()
            });
        }
        return orders;
    }

    // Genera entregas asociadas a pedidos y repartidores
    generateMockDeliveries(orders = [], couriers = []) {
        const deliveries = [];
        orders.forEach((order) => {
            const courierId = couriers.length > 0
                ? faker.helpers.arrayElement(couriers)._id
                : new mongoose.Types.ObjectId().toString();

            deliveries.push({
                _id: new mongoose.Types.ObjectId().toString(),
                order: order._id,
                courier: courierId,
                address: faker.location.streetAddress({ useFullAddress: true }),
                status: faker.helpers.arrayElement(Object.values(DELIVERY_STATUS)),
                estimatedDeliveryDate: faker.date.soon()
            });
        });
        return deliveries;
    }

    // Inserta registros de prueba en MongoDB respetando las relaciones
    async seedDatabase(qty = 10) {
        const qtyNum = parseInt(qty, 10) || 10;

        // 1. Crear usuarios (Clientes y Repartidores)
        const rawClients = this.generateMockUsers(qtyNum, ROLES.CLIENTE);
        const rawCouriers = this.generateMockUsers(Math.ceil(qtyNum / 2), ROLES.REPARTIDOR);

        const insertedClients = await this.mockRepository.insertUsers(rawClients);
        const insertedCouriers = await this.mockRepository.insertUsers(rawCouriers);

        const clientIds = insertedClients.map((u) => u._id);

        // 2. Crear pedidos relacionados a los clientes
        const rawOrders = this.generateMockOrders(qtyNum, clientIds);
        const insertedOrders = await this.mockRepository.insertOrders(rawOrders);

        // 3. Crear entregas relacionadas a pedidos y repartidores
        const rawDeliveries = this.generateMockDeliveries(insertedOrders, insertedCouriers);
        const insertedDeliveries = await this.mockRepository.insertDeliveries(rawDeliveries);

        return {
            usuariosInsertados: insertedClients.length + insertedCouriers.length,
            pedidosInsertados: insertedOrders.length,
            entregasInsertadas: insertedDeliveries.length
        };
    }
}