import { SortOrder } from 'mongoose'
import calculaePagenation from '../../../helpers/pagenationhelper'
import { IpagenationOptions } from '../../../interfaces/IpaginationOptions'
import { IsearchFilter } from '../../../interfaces/IsearchFilter'
import { cowSearchFields } from './cow.constant'
import { ICow } from './cow.interface'
import Cow from './cow.model'

type IGeneRicResponce<T> = {
  meta: {
    page?: number | null
    limit?: number | null
    total?: number | null
  }
  data: T
}

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const data = payload
  const result = await Cow.create(data)
  return result
}
const getCow = async (
  pageinationOptios: IpagenationOptions,
  SearchFilter: IsearchFilter,
): Promise<IGeneRicResponce<ICow[]>> => {
  //pagenation
  const { page, skip, limit, sortBy, sortOrder } =
    calculaePagenation(pageinationOptios)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  //serach Filter Data
  const { searchTerm, minPrice, maxPrice, ...filterdata } = SearchFilter

  const addCondition = []

  if (searchTerm) {
    addCondition.push({
      $or: cowSearchFields.map(field => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }
  // Filter Fields
  if (Object.keys(filterdata).length) {
    addCondition.push({
      $and: Object.entries(filterdata).map(([field, value]) => ({
        [field]: [value],
      })),
    })
  }

  if (minPrice) {
    addCondition.push({ price: { $gte: minPrice } })
  }

  if (maxPrice) {
    addCondition.push({ price: { $lte: maxPrice } })
  }

  const whereCondition = addCondition.length ? { $and: addCondition } : {}

  const result = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Cow.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingelCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)
  return result
}
const updateCowProfile = async (
  _id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: _id }, payload, {
    new: true,
  })
  return result
}
const DalateCowService = async (_id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete({ _id: _id })
  return result
}
export const cowServices = {
  createCow,
  getCow,
  getSingelCow,
  updateCowProfile,
  DalateCowService,
}
