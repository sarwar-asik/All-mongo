/* eslint-disable no-console */
import { User } from './user.model';
import { IUser } from './user.interface';

import config from '../../../config.ts/index';
import { generateUserId } from './user.utils';
import ApiError from '../../../errors/ApiError';

const createUserServices = async (user: IUser): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_user_pass as string;
  }
  const id = await generateUserId();

  user.id = id;

  console.log(user, 'from services');

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create new User');
  }
  return createdUser;
  // return null
};

export const UserService = { createUserServices };
// export default { createUser}
