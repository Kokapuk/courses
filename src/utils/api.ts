import type { User, UserWithoutPassword } from '@/types/userSchema';
import randomSuccess from './randomSuccess';
import sleep from './sleep';

export const authenticate = async (user: User): Promise<UserWithoutPassword> => {
  await sleep(1000);

  if (randomSuccess()) {
    return { email: user.email };
  } else {
    throw Error('Failed to authenticate');
  }
};
