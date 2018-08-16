import express from 'express';
import UserController from '../controllers/userController';
import TodosController from '../controllers/todoController';
import authenticate from "../middleware/authentication";

const router = express.Router();

router.route('/api/v1/users')
    .post(UserController.createUser)
    .get(authenticate.verifyToken, UserController.getAllUsers);

router.route('/api/v1/users/:id')
    .get(authenticate.verifyToken, UserController.getOneUser)
    .put(
        authenticate.verifyToken,
        authenticate.verifyOwnProfile, 
        UserController.updateUser
    )
    .delete(
        authenticate.verifyToken,
        authenticate.verifyOwnProfile, 
        UserController.deactivateUser
    );

router.route('/api/v1/login')
  .post(UserController.logUserIn);

router.route('/api/v1/todos')
  .get(authenticate.verifyToken, TodosController.getAllTodos)
  .post(authenticate.verifyToken, TodosController.createTodo);

export default router;