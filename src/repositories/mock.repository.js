import { UserModel } from '../models/User.js';
import { OrderModel } from '../models/Order.js';
import { DeliveryModel } from '../models/Delivery.js';

export class MockRepository {
    async insertUsers(users) {
        return await UserModel.insertMany(users);
    }

    async insertOrders(orders) {
        return await OrderModel.insertMany(orders);
    }

    async insertDeliveries(deliveries) {
        return await DeliveryModel.insertMany(deliveries);
    }
}