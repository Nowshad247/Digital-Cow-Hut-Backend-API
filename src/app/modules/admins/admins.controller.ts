import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import config from '../../../config'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { adminsService } from './admins.service'

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const getData = req.body
    const result = await adminsService.createAdminService(getData)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admin account is Created ',
      data: result,
    })
  },
)
const login: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const adminCredentioal = req.body
    const result = await adminsService.login(adminCredentioal)
    const { refreshToken, ...Other } = result
    // set Refresh tocken into cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOption)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Login In Success ',
      data: Other,
    })
  },
)
const refreshTocken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const refreshTocken = req.cookies.refreshToken
    const result = await adminsService.refreshTocken(refreshTocken)
    // set Refresh tocken into cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', result, cookieOption)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New Token Set  ',
      data: result,
    })
  },
)

export const adminContoller = {
  createAdmin,
  login,
  refreshTocken,
}
