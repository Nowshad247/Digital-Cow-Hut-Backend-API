import { IAdmin } from './admins.interface'
import Admin from './admins.model'
const createAdminService = async (payload: IAdmin) => {
  const result = Admin.create(payload)
  return result
}
export const adminsService = {
  createAdminService,
}
