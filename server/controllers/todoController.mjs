
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
  }
}

export default TodosController;
