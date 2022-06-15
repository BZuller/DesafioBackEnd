import { Request, Response } from 'express';
import CreateUserService from '../services/createUser.service';
import DeleteUser from '../services/DeleteUser.service';
import UpdateUserService from '../services/EditUser.service';
import GetUserService from '../services/GetUser.service';
import ListUsersService from '../services/listUsers.service';

export default class UsersController {
  public async index(request: Request, response: Response) {
    const listUser = new ListUsersService();

    const users = await listUser.execute();

    return response.json(users);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const findUser = new GetUserService();

    const user = await findUser.execute({ id });
    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, observations, birthdate, password, admin } =
      request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      cpf,
      observations,
      birthdate,
      password,
      admin,
    });
    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUser();

    await deleteUser.execute({ id });

    return response.json([]);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { observations } = request.body;

    const updateUser = new UpdateUserService();

    const user = await updateUser.execute({
      id,
      observations,
    });

    return response.json(user);
  }
}
