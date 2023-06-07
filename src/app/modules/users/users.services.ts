import { User } from './users.model'
import { IUser } from './users.interface'

import config from '../../../config.ts/index'
import { generateUserId } from './user.utils'
import ApiError from '../../../errors/ApiError'

export const createUserServices = async (
  user: IUser
): Promise<IUser | null> => {
  if (!user?.password) {
    user.password = config.default_user_pass as string
  }
  const id = await generateUserId()

  user.id = id

  // console.log(id, 'from services')

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400,'Failed to create new User')
  }
  return createdUser
  // return null
}

// export default { createUser}
