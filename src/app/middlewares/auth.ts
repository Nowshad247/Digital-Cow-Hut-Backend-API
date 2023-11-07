import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../config'
import ApiError from '../../errors/apiErrors'
import { jwtHelper } from '../../helpers/jwtHelper'
import { IAdmin } from '../modules/admins/admins.interface'
import { IUser } from '../modules/user/user.interface'
// Update with the correct path to your config
// Define interfaces representing your user types

type CustomRequest = Request & { user?: IUser | IAdmin | undefined }

const auth =
  (...role: string[]) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const authorizationToken = req.headers
      const getToken = authorizationToken.authorization // May be undefined

      if (!getToken) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not applicable to this URL',
        )
      }

      // Verification token and type assertion to IUser or IAdmin
      const user = jwtHelper.verifyToken(
        getToken as string,
        config.JWT_SECRET as Secret,
      ) as IUser | IAdmin // Type assertion here

      if (role.length && !role.includes(user.role)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Unauthorized Access!')
      }

      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
