import { getCustomRepository } from 'typeorm';
// eslint-disable-next-line import/no-named-as-default
import UserRepository from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';
import User from '../database/entities/User';

interface IRequest {
  id: string;
  observations: string;
  admin: boolean;
}

class UpdateUserService {
  public async execute({ id, observations, admin }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new ApiError(404, false, 'User not found');
    }
    user.observations = observations;
    user.admin = admin;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
