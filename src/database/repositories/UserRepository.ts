import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        cpf,
      },
    });
    return user;
  }

  public async findByRole(
    admin: boolean,
    cpf: string
  ): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        admin,
        cpf,
      },
    });
    return user;
  }
}

export default UserRepository;
