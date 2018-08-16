
import models from "../models";
import generateToken from '../utilities';


const User = models.User;
const Todo = models.Todo;

const UserController = {

  async createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        const token = await generateToken(newUser);
        return res.status(200).send({
            message: `User ${newUser.name} has been created successfully`,
            token
        });
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },


  async logUserIn(req, res) {
    try {
        if (!req.body.email || !req.body.password)
            return res.status(400).send({ message: 'Email and password must be supplied' });
        const foundUser = await User.findOne({ where: { email: req.body.email, active: true } });
        if (!foundUser || !foundUser.isValidPassword(req.body.password, foundUser.password))
            return res.status(401).send({ message: 'Invalid email or password' });
        
        const token = await generateToken(foundUser);
        return res.status(200).send({
            message: 'User logged in successfully',
            token
        });
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
        return res.status(200).send(allActiveUsers);
    }
    catch (error) {
        res.status(400).send(error.message);
      };
  },

  async getOneUser(req, res) {
    try {
        const foundUser = await User.findOne({
            attributes: ['id', 'name', 'email', 'active', 'createdAt', 'updatedAt'],
            where: { id: req.params.id, active: true },
            include: [{ model: Todo, as: 'todos' }]
        });

        if (!foundUser) return res.status(404).send({ message: 'No user found' });
        return res.status(200).send(foundUser);
    }
    catch (error) {
        res.status(400).send(error.message);
      };
  },

  async updateUser(req, res) {
    try {
        const foundUser = await User.findOne({
            where: { id: req.params.id, active: true },
        });

        if (!foundUser) return res.status(404).send({ message: 'No user found' });
        delete req.body.active;
        await foundUser.update(req.body, { fields: Object.keys(req.body) });
        return res.status(200).send({ message: 'User successfully updated'});
    }
    catch (error) {
        res.status(400).send(error.message);
      };
  },

  async deactivateUser(req, res) {
    try {
        const foundUser = await User.findOne({
            where: { id: req.params.id, active: true },
        });

        if (!foundUser) return res.status(404).send({ message: 'No user found' });
        await foundUser.update({ active: false })
        return res.status(200).send({ message: 'User successfully deleted'});
    }
    catch (error) {
        res.status(400).send(error.message);
      };
  },
}

export default UserController;
