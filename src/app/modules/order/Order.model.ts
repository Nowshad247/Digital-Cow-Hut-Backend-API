import { Schema, model } from 'mongoose'
import { IOrder, OrderModel } from './order.interface'

const OrderSchema = new Schema<IOrder>({
  cow: { type: Schema.Types.ObjectId, ref: 'cow', required: true },
  buyer: { type: Schema.Types.ObjectId, ref: 'user', required: true },
})

const Order = model<IOrder, OrderModel>('Order', OrderSchema)

export default Order
