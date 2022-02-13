import { User } from '../../User/user.entity';
import { getRepository } from 'typeorm';

export async function checkUserName(username: string): Promise<boolean> {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.fullname = :fullname', { fullname: username })
    .getOne();
  return user === undefined ? false : true;
}
