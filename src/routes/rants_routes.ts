import { Router } from 'express';
import RantController from '../controllers/rants_controller.ts';
import Rant from '../models/rants_model';

const router = Router()

router.post('/add-rant', RantController.addRant)
router.get('/all-rants', RantController.getAllRants)
router.get('/my-rants/:userId', RantController.getUserRants)
router.get('/:rantId', RantController.getRantById)
router.post('/add-comment/:rantId', RantController.addRantComment)
router.delete('/delete-rant/:rantId', RantController.deleteRant)
router.delete('/delete-comment/:commentId', RantController.deleteRantComment)

export default router