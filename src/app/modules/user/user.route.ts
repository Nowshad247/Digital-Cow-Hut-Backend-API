import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { userController } from './user.controller'
import UpdateUserValidation from './user.zodValidation'
const router = express.Router()

router.get('/', userController.getAlluser)
router.get('/:id', userController.getUserById)

router.patch(
  '/:id',
  validateRequest(UpdateUserValidation),
  userController.UpdateUser,
)
router.delete('/:id', userController.DeleteUser)

export const userRoute = router
