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
export const AurhRouth = router
