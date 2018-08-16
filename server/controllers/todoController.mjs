
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
        return res.status(200).send(allTodos);
    }
    catch (error) {
      res.status(400).send(error.message);
    };
  },
}

export default TodosController;
