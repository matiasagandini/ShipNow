import { ROLES } from '../constants/index.js';

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async createUser(userData) {
        if (!userData.email || !userData.name) {
            throw new Error('El nombre y email son obligatorios');
        }

        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        if (!userData.role || !Object.values(ROLES).includes(userData.role)) {
            userData.role = ROLES.USER;
        }

        return await this.userRepository.create(userData);
    }
}