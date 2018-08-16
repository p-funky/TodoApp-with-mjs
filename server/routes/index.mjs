import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.route("/api/v1/users")
    .post(UserController.createUser);

export default router;