import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../entities/User';

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const rows = await connection.getRepository(User).count();
    if (rows > 0) {
      const password = 'admin';
      const hashedPassword = await hash(password, 7);
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            name: 'Default Admin',
            cpf: '000.000.000-00',
            password: hashedPassword,
            observations: 'Conta adm padrão',
            birthdate: '01/01/2001',
            admin: true,
          },
        ])
        .execute();
    }
  }
}
