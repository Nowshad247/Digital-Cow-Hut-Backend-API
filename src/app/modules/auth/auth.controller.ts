import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { IUser } from '../user/user.interface'
import { AurhService } from './auth.service'

const signup: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const userData = req.body
      const result = await AurhService.createUser(userData)

      if (result?.refreshToken) {
        const { refreshToken } = result
        const cookieOption = {
          secure: config.env === 'production',
          httpOnly: true,
        }
        res.cookie('refreshToken', refreshToken, cookieOption)
      }

      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Signed up Successfully!',
        data: result,
      })
    } catch (error) {
      sendResponse<IUser>(res, {
        statusCode: httpStatus.EXPECTATION_FAILED,
        success: true,
        message: 'User Signed up Faild!',
        data: null,
      })
    }
  },
)

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    res.send('changePassword')
  },
)
export const authController = { signup, changePassword }
