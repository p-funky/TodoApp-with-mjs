
import models from "../models";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_TOKEN || 'secret';
const User = models.User;

const UserController = {
  async createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        const token = jwt.sign({
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }, secret, { expiresIn: '24h' });
        res.status(200).send({ message: `User ${newUser.name} has been created successfully`, token });
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },

  async getAllUsers(req, res) {
    try {
        const allActiveUsers = await User.findAll({
            attributes: ['id', 'name', 'email', 'active', 'createdAt', 'updatedAt'],
            where: {active: true}
        });

        if(!allActiveUsers.length) return res.status(404).send({ message: 'No user found' });
        res.status(200).send(allActiveUsers);
    }
    catch (error) {
        res.status(400).send(error.message);
      };
  },
}

export default UserController;
