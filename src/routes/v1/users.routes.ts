import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import UsersController from '../../controllers/UserController';
import isAdmin from '../../middlewares/adminAuth';
import isAuth from '../../middlewares/isAuth';

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
 *           schema:
 *              $ref: '#/components/schemas/getUsers'
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
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 *       409:
 *         description: Cpf already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/error/CpfDuplicated'
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
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editUser'
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
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
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
 *             schema:
 *               $ref: '#/components/error/InvalidJWT'
 */

usersRouter.get('/', isAuth, usersController.index);

usersRouter.get('/:id', usersController.find);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf: Joi.string().required(),
      observations: Joi.string(),
      birthdate: Joi.date().required(),
      password: Joi.string().required(),
      admin: Joi.boolean().required(),
    },
  }),
  usersController.create
);

usersRouter.delete(
  '/:id',
  isAdmin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete
);

usersRouter.put(
  '/:id',
  isAdmin,
  celebrate({
    [Segments.BODY]: {
      observations: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  usersController.update
);

export default usersRouter;
