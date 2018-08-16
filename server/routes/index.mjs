import express from 'express';
import UserController from '../controllers/userController';
import authenticate from "../middleware/authentication";

const router = express.Router();

router.route("/api/v1/users")
    .post(UserController.createUser)
    .get(authenticate.verifyToken, UserController.getAllUsers);

export default router;