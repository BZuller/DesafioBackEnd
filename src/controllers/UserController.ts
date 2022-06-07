import { Request, Response } from 'express';

export default class UsersController {
  public async index(request: Request, response: Response) {
    const listUser = ListUsersService();
  }
}
