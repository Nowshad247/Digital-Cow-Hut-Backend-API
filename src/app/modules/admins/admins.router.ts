import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import createadminSchema from './admin.ZodValidation'
import { adminContoller } from './admins.controller'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(createadminSchema),
  adminContoller.createAdmin,
)

export const adminRoute = router
