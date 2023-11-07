import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/apiErrors'
import { jwtHelper } from '../../../helpers/jwtHelper'
import { IAdmin, IUserCredential } from './admins.interface'
import Admin from './admins.model'
const createAdminService = async (user: IAdmin) => {
  const result = Admin.create(user)
  return result
}

const login = async (payload: IUserCredential) => {
  const { phoneNumber, password } = payload
  //Check Admin
  const isUserExist = await Admin.isAdminExist(phoneNumber)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exist')
  }

  //Match Password
  const match = await Admin.isPassMatched(password, isUserExist.password)

  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'wrong Password ')
  }

  const { _id, role } = isUserExist

  const accessTocken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string,
  )
  // Refresh Token
  const refreshToken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_REFRESH_EXPIRE as string,
  )

  return { _id, role, refreshToken, accessTocken, match }
}

const refreshTocken = async (token: string) => {
  let decoded: JwtPayload | string
  try {
    decoded = jwt.verify(token, config.JWT_SECRET as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Bad request')
  }

  if (typeof decoded === 'string') {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'Token verification failed')
  }
  const getAdminInfo = await Admin.findOne({ _id: decoded?._id })

  //Gen new token
  if (!getAdminInfo) {
    throw new ApiError(httpStatus.BAD_GATEWAY, 'There is not User On this Id')
  }

  const { _id, role } = getAdminInfo

  const accessTocken = jwtHelper.generateToken(
    { _id, role },
    config.JWT_SECRET as Secret,
    config.JWT_SECRET_EXPIRE as string,
  )

  return accessTocken
}
export const adminsService = {
  createAdminService,
  login,
  refreshTocken,
}
