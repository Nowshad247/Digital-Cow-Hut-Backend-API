import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/apiErrors'
import { jwtHelper } from '../../../helpers/jwtHelper'
import Admin from '../admins/admins.model'
import { IUser, IpasswordChange } from '../user/user.interface'
import User from '../user/user.model'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const data = await User.create(payload)
  const { _id, role } = data
  // Refresh Token
  const refreshToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_REFRESH_EXPIRE as string,
  )

  data.refreshToken = refreshToken

  return data
}
const changePassword = async (
  password: IpasswordChange,
  token: string | null,
) => {
  let verifyTokenId = null
  let userData = null
  if (token) {
    verifyTokenId = await jwtHelper.verifyToken(
      token,
      config.JWT_SECRET as Secret,
    )
  } else {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Token missing')
  }
  const { _id, role } = verifyTokenId

  // find user
  if (role == 'Admin') {
    userData = await Admin.findOne({ _id: _id })
  } else {
    userData = await User.findOne({ _id: _id })
  }
  // Match Old password
  const MarchPassword = await bcrypt.compare(
    password?.OldPassword as string,
    userData?.password as string,
  )

  if (!MarchPassword) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Old Password Is not Match ')
  }

  // hash password before saving
  const newHashedPassword = await bcrypt.hash(
    password.NewPassword as string,
    Number(config.JWT_SECRET),
  )

  const updateBrofile = await User.findOneAndUpdate(
    { _id: _id },
    {
      password: newHashedPassword,
    },
  )
  const data = {
    password,
    updateBrofile,
  }

  return data
}

export const AurhService = { createUser, changePassword }
// $2b$12$yQqbHQb0TfFVM9S7FKbsmOYT9SOgSTAefHmZgOvx0JzI84ZR7wM.2
