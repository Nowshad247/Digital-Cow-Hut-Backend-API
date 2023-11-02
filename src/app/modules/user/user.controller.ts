import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { pagenationFilds } from '../../../constants/pagenation'
import pick from '../../../shared/pick'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { IUser } from './user.interface'
import { userService } from './user.services'

export const userRole = ['seller', 'buyer']
const getAlluser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const pageinationOptios = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: String(req.query.sortBy),
    //   sortOrder: String(req.query.sortorder),
    // }
    const pageinationOptios = pick(req.query, pagenationFilds)
    const result = await userService.getAllusers(pageinationOptios)

    res.send(result)
  },
)
const getUserById: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await userService.getUser(id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Done',
    data: result,
  })
})
const UpdateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const userData = req.body

    const result = await userService.updateProfile(id, userData)

    if (result !== null && result !== undefined) {
      sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Succesfully',
        data: result,
      })
    } else {
      sendResponse<IUser>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Data Not Update , Somthing Is Eror',
        data: null,
      })
    }
  },
)
const DeleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await userService.DalateUserService(id)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Done',
    data: result,
  })
})
export const userController = {
  getAlluser,
  getUserById,
  UpdateUser,
  DeleteUser,
}
