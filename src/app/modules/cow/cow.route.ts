import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { cowController } from './cow.controller'
import { zodCowValidation } from './cow.validation'
const router = express.Router()

router.post('/', cowController.listAcow)
router.get('/', cowController.showCow)
router.get('/:id', cowController.showSingelCow)
router.patch(
  '/:id',
  validateRequest(zodCowValidation.UpdateZodCowValidation),
  cowController.UpdateCow,
)

router.delete('/:id', cowController.DeleteCow)

export const cowRoute = router
