import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authController } from './auth.controller'
import UserZodValidation from './auth.zodValidation'
const router = express.Router()
router.post(
  '/signup',
  validateRequest(UserZodValidation),
  authController.signup,
)
router.get(
  '/change-password',
  validateRequest(UserZodValidation),
  authController.changePassword,
)
export const AurhRouth = router
