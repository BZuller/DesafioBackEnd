import { Request, Response } from 'express';
import CreateSessionService from '../services/createSession.service';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const createSession = new CreateSessionService();
    const user = await createSession.execute({
      cpf,
      password,
    });

    response.set('authorization', user.token);

    return response.json(user);
  }
}
