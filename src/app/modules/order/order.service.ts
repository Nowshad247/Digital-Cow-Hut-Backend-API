import httpStatus from 'http-status'
import mongoose from 'mongoose'
import ApiError from '../../../errors/apiErrors'
import Cow from '../cow/cow.model'
import User from '../user/user.model'
import Order from './Order.model'
import { IOrder } from './order.interface'

const createOrder = async (payload: IOrder) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //Cow Find
    const cow = await Cow.findById(payload.cow)

    if (cow) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'Now Cow Found')
    }
    //find CowSeller
    const cowSeller = await Cow.findById(payload.cow).populate('seller')
    const sellerID = cowSeller?.seller.id

    if (sellerID) {
      throw new ApiError(
        httpStatus.BAD_GATEWAY,
        'Cow Seller data is not finding ',
      )
    }
    // Find the buyer
    const buyer = await User.findById(payload.buyer)
    const buyerId = buyer?._id

    if (buyerId) {
      throw new ApiError(httpStatus.BAD_GATEWAY, 'No Buyer ')
    }

    const buyerBudgetPrice = buyer?.budget || 0

    const newOrder = await Order.create({
      cow: sellerID,
      buyer: buyerId,
      buyerBudgetPrice,
    })

    await session.commitTransaction()
    await session.endSession()
    return {
      sellerID,
      buyerId,
      newOrder,
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new ApiError(httpStatus.BAD_REQUEST, 'Somthing went wrong')
  }
}
const GetAllOrders = async () => {
  const result = await Order.find()
  return result
}
export const orderService = {
  createOrder,
  GetAllOrders,
}
