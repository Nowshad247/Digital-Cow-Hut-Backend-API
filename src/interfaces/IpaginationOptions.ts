import { SortOrder } from 'mongoose'

export type IpagenationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder | undefined
}
