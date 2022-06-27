import { Router } from 'express';
import UsersController from '../../controllers/UserController';
import isAdmin from '../../middlewares/adminAuth';
import isAuth from '../../middlewares/isAuth';
import validate from '../../middlewares/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from '../../schemas/user.schema';

const usersRouter = Router();
const usersController = new UsersController();

/**
 * @openapi
 *
 * '/user':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a new user
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createUser'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User created"
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *       409:
 *         description: Cpf already exists
 *         content:
 *           application/json:
 * '/api/v1/users/{userId}':
 *  put:
 *     tags:
 *     - Users
 *     summary: Edit user's Obs and permission
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user's id
 *        required: true
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User updated"
 *       400:
 *         description: Bad Request.
 *         content:
 *           application/json:
 *             schema:
 *               example: ["User not found"]
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete user
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user's id
 *        required: true
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *           example:
 *             "User deleted"
 *       401:
 *         description: Invalid JWT Token
 *         content:
 *           application/json:
 */

usersRouter.get('/', isAuth, usersController.index);

usersRouter.get('/:id', usersController.find);

usersRouter.post(
  '/',
  isAdmin,
  validate(createUserSchema),
  usersController.create
);

usersRouter.delete(
  '/:id',
  isAdmin,
  validate(deleteUserSchema),
  usersController.delete
);

usersRouter.put(
  '/:id',
  isAdmin,
  validate(updateUserSchema),
  usersController.update
);

export default usersRouter;
