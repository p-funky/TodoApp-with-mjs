
import models from "../models";
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET_TOKEN || 'secret';

const UserController = {
  async createUser (req, res) {
    try {
        const newUser = await models.User.create(req.body);
        const token = jwt.sign({
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
        }, secret, { expiresIn: '24h' });
        res.status(201).send({ message: `User ${newUser.name} has been created successfully`, token });
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
}

export default UserController;
