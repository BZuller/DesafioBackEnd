import { getCustomRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../database/entities/User';
import ApiError from '../utils/apiError.utils';
// eslint-disable-next-line import/no-named-as-default
import UserRepository from '../database/repositories/UserRepository';

interface IRequest {
  name: string;
  password: string;
  cpf: string;
}

class CreateUserService {
  public async execute({ name, password, cpf }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const cpfExists = await usersRepository.findByCpf(cpf);

    if (cpfExists) {
      throw new ApiError(409, false, 'Already Exists');
    }
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      cpf,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
