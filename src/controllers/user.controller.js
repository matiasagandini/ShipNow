export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    getUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            return res.status(200).json({ status: 'success', payload: users });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    };

    createUser = async (req, res) => {
        try {
            const newUser = await this.userService.createUser(req.body);
            return res.status(201).json({ status: 'success', payload: newUser });
        } catch (error) {
            return res.status(400).json({ status: 'error', message: error.message });
        }
    };
}