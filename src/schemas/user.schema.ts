import { object, string, InferType, boolean } from 'yup';

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */

const criacao = {
  body: object({
    name: string().defined('A name is required'),
    password: string().defined('Password is required'),
    cpf: string().defined('CPF is required').length(11, 'Must be a valid cpf'),
    observations: string().max(
      500,
      'Observations must be less than 500 characters'
    ),
    admin: boolean().defined(),
  }).defined(),
};

const update = {
  body: object({
    observations: string().max(
      500,
      'Observations must be less than 500 characters'
    ),
    admin: boolean().defined(),
  }).defined(),
};

const params = {
  params: object({ userId: string().defined('productId is required') }),
};

export const createUserSchema = object({
  ...criacao,
});

export const updateUserSchema = object({
  ...update,
  ...params,
});

export const deleteUserSchema = object({
  ...params,
});

export const getUserSchema = object({
  ...params,
});

export type CreateProductInput = InferType<typeof createUserSchema>;
export type UpdateProductInput = InferType<typeof updateUserSchema>;
export type ReadProductInput = InferType<typeof getUserSchema>;
export type DeleteProductInput = InferType<typeof deleteUserSchema>;
