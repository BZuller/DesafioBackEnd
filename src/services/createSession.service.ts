import { compare } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import User from '../database/entities/User';
// eslint-disable-next-line import/no-named-as-default
import UserRepository from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';
import { signJwt } from '../utils/jwt.utils';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByCpf(cpf);

    if (!user) {
      throw new ApiError(401, false, 'Incorrect cpf or password');
    }
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new ApiError(401, false, 'Incorrect cpf or password');
    }
    const token = signJwt({ sub: user.id, admin: user.admin });
    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
