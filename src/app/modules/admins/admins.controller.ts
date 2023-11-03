import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
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

export const adminContoller = {
  createAdmin,
}
