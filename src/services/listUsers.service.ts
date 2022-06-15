import { getCustomRepository } from 'typeorm';
import User from '../database/entities/User';
// eslint-disable-next-line import/no-named-as-default
import UserRepository from '../database/repositories/UserRepository';

class ListUsersService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepository);
    const userList = await usersRepository.find();
    return userList;
  }
}
export default ListUsersService;
