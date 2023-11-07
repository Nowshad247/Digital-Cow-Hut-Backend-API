import express from 'express'
import { USER_ENUM } from '../../../enum/common'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { cowController } from './cow.controller'
import { zodCowValidation } from './cow.validation'
const router = express.Router()

router.post(
  '/',
  auth(USER_ENUM.ADMIN, USER_ENUM.SELLER),
  cowController.listAcow,
)
router.get(
  '/',
  auth(USER_ENUM.ADMIN, USER_ENUM.SELLER, USER_ENUM.BUYER),
  cowController.showCow,
)
router.get(
  '/:id',
  auth(USER_ENUM.ADMIN, USER_ENUM.SELLER, USER_ENUM.BUYER),
  cowController.showSingelCow,
)
router.patch(
  '/:id',
  validateRequest(zodCowValidation.UpdateZodCowValidation),
  auth(USER_ENUM.SELLER),
  cowController.UpdateCow,
)

router.delete(
  '/:id',
  auth(USER_ENUM.ADMIN, USER_ENUM.SELLER),
  cowController.DeleteCow,
)

export const cowRoute = router
