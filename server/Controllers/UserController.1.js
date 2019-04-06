import { users } from '../helper/utilities';
import generateToken from "../middleware/genToken";
require('dotenv').config();


class UserController {
    static signUp(req, res) {
        const { email, firstName, lastName, phoneNumber, password, type, isAdmin, } = req.body;
        const user = {
            id: users.length + 1,
            email,
            firstName,
            lastName,
            phoneNumber,
            password,
            type,
            isAdmin,
        };
        users.push(user);
        const token = generateToken(user.id, user.email, user.isAdmin, user.type);
        return res.header('x-access-token', token).status(201).json({
            status: '201',
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    type: user.type,
                    isAdmin: user.isAdmin,
                },
                token,
            },
        });
    }
    static getUser(req, res) {
        res.status(201).json({
            status: '200',
            data: users,
        });
    }
    static login(req, res) {
        const { email, password, } = req.body;
        const currentUser = users.find(user => user.email === email && user.password === password);
        if (currentUser) {
            const token = generateToken(currentUser.id, currentUser.email, currentUser.isAdmin, currentUser.type);
            return res.header('x-access-token', token).status(200).json({
                status: '200',
                data: {
                    currentUser: {
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        email: currentUser.email,
                        phoneNumber: currentUser.phoneNumber,
                        type: currentUser.type,
                        isAdmin: currentUser.isAdmin,
                    },
                    token,
                },
            });
        }
        return res.status(404).json({
            status: '404',
            error: 'Username or Password is Incorrect',
        });
    }
}

export default UserController;