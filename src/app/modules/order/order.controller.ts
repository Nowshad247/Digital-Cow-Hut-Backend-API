import { RequestHandler } from 'express'
import catchAsync from '../../../utils/catchAsync'
import { orderService } from './order.service'

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  const orderDate = req.body
  const result = await orderService.createOrder(orderDate)
  res.send(result)
  //   sendResponse<IOrder>(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Order data created Successfully!',
  //     data: result,
  //   })
})
const getAllOrder: RequestHandler = catchAsync(async (req, res) => {
  const result = await orderService.GetAllOrders()
  res.send(result)
})
export const orderController = {
  createOrder,
  getAllOrder,
}
