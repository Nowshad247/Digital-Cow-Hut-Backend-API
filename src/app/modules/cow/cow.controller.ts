import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import { cowSearchOption } from '../../../constants/cowSearchOption'
import { pagenationFilds } from '../../../constants/pagenation'
import ApiError from '../../../errors/apiErrors'
import pick from '../../../shared/pick'
import catchAsync from '../../../utils/catchAsync'
import sendResponse from '../../../utils/sendResponse'
import { ICow } from './cow.interface'
import { cowServices } from './cow.service'

const listAcow: RequestHandler = catchAsync(async (req, res) => {
  try {
    const getDataBybody = req.body
    const result = await cowServices.createCow(getDataBybody)
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow data Deleted Successfully!',
      data: result,
    })
  } catch (error) {
    const statusCode = 404
    const errorMessage = 'Resource not found'
    const newApiError = new ApiError(statusCode, errorMessage)
    res.send(newApiError)
  }
})
const showCow: RequestHandler = catchAsync(async (req, res) => {
  //Search
  const searchTermFilter = pick(req.query, cowSearchOption)
  //pagenation
  const pageinationOptios = pick(req.query, pagenationFilds)

  const result = await cowServices.getCow(pageinationOptios, searchTermFilter)

  res.send({ pageinationOptios, searchTermFilter, result })
})
const showSingelCow: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await cowServices.getSingelCow(id)
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow data Deleted Successfully!',
    data: result,
  })
})
const UpdateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const cowData = req.body
    const result = await cowServices.updateCowProfile(id, cowData)
    if (result !== null && result !== undefined) {
      sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update Succesfully',
        data: result,
      })
    } else {
      sendResponse<ICow>(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Data Not Update , Somthing Is Eror',
        data: null,
      })
    }
  },
)
const DeleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await cowServices.DalateCowService(id)
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Done',
      data: result,
    })
  },
)

export const cowController = {
  listAcow,
  showCow,
  showSingelCow,
  UpdateCow,
  DeleteCow,
}
