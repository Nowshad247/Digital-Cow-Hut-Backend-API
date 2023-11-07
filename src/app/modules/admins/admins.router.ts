import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AdminValidation } from './admin.ZodValidation'
import { adminContoller } from './admins.controller'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createadminSchema),
  adminContoller.createAdmin,
)
router.post(
  '/login',
  validateRequest(AdminValidation.loginadminSchema),
  adminContoller.login,
)
router.post(
  '/refresh-tocken',
  validateRequest(AdminValidation.refreshTockenValidation),
  adminContoller.refreshTocken,
)

export const adminRoute = router
