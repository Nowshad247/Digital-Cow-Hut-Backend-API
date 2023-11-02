import { SortOrder } from 'mongoose'

type Ioptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder | undefined
}
type IOptionResult = {
  limit: number
  page: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
const calculaePagenation = (options: Ioptions): IOptionResult => {
  const { limit = 10, page = 1 } = options
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || ('desc' as SortOrder)
  return {
    limit,
    page,
    skip,
    sortBy,
    sortOrder,
  }
}

export default calculaePagenation
