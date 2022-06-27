import { getCustomRepository } from 'typeorm';
import User from '../database/entities/User';
// eslint-disable-next-line import/no-named-as-default
import UserRepository from '../database/repositories/UserRepository';
import ApiError from '../utils/apiError.utils';

interface IRequest {
  id: string;
}

class GetUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne(id);
    // eslint-disable-next-line no-console
    console.log(user, id);
    if (!user) {
      throw new ApiError(400, false, 'User not found');
    }
    return user;
  }
}
export default GetUserService;
