import express from 'express'
import { USER_ENUM } from '../../../enum/common'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { authController } from './auth.controller'
import { authZodValidation } from './auth.zodValidation'

const router = express.Router()
router.post(
  '/signup',
  validateRequest(authZodValidation.UserZodValidation),
  authController.signup,
)
router.get(
  '/change-password',
  validateRequest(authZodValidation.changePasswordValidation),
  auth(USER_ENUM.ADMIN, USER_ENUM.SELLER, USER_ENUM.BUYER),
  authController.changePassword,
)
export const AurhRouth = router
