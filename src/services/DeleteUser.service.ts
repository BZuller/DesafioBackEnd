import { getCustomRepository } from 'typeorm';
import UserRepository from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  id: string;
}

class DeleteUser {
  public async execute({ id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new ApiError(404, false, 'User not found');
    }

    await usersRepository.remove(user);

    return user;
  }
}

export default DeleteUser;
