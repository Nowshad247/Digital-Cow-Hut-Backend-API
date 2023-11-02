import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { IUser } from '../user/user.interface'
import { AurhService } from './auth.service'

const signup: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const userData = req.body
      const result = await AurhService.createUser(userData)
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
export const authController = { signup }
