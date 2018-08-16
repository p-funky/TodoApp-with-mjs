
import models from "../models";

const Todo = models.Todo;

const TodosController = {

  async createTodo(req, res) {
    try {
        const newTodo = await Todo.create({
            title: req.body.title,
            userId: req.decoded.userId
        });
        return res.status(200).send(newTodo);
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
  async getAllTodos(req, res) {
    try {
        const allTodos = await Todo.findAll({
            where: { userId: req.decoded.userId }
        });
        if (!allTodos.length) return res.status(404).send({ message: 'No todo found' });
        return res.status(200).send(allTodos);
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
  async getOneTodo(req, res) {
    try {
        const myTodo = await Todo.findOne({
            where: { id: req.params.id, userId: req.decoded.userId }
        });
        if (!myTodo) return res.status(403).send({ message: 'User not authorised' });
        return res.status(200).send(myTodo);
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
  async updateATodo(req, res) {
    try {
        const myTodo = await Todo.findOne({
            where: { id: req.params.id, userId: req.decoded.userId }
        });
        if (!myTodo) return res.status(403).send({ message: 'User not authorised' });
        const updatedTodo = await myTodo.update({ title: req.body.title });
        return res.status(200).send(updatedTodo);
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
}

export default TodosController;
