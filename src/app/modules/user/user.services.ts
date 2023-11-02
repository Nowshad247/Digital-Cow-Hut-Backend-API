import { SortOrder } from 'mongoose'
import calculaePagenation from '../../../helpers/pagenationhelper'
import { IpagenationOptions } from '../../../interfaces/IpaginationOptions'
import { IUser } from './user.interface'
import User from './user.model'
type IGeneRicResponce<T> = {
  meta: {
    page?: number | null
    limit?: number | null
    total?: number | null
  }
  data: T
}
const getAllusers = async (
  pageinationOptios: IpagenationOptions,
): Promise<IGeneRicResponce<IUser[]>> => {
  const { page, skip, limit, sortBy, sortOrder } =
    calculaePagenation(pageinationOptios)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await User.find().sort(sortCondition).skip(skip).limit(limit)
  const total = await User.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}
const updateProfile = async (
  _id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  })
  return result
}
const DalateUserService = async (_id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete({ _id: _id })
  return result
}

export const userService = {
  getAllusers,
  getUser,
  updateProfile,
  DalateUserService,
}
