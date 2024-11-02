import sleepController from '../controllers/sleep_controller';
import upload from '../middlewares/multer';
import { Router } from 'express';

const router = Router();

router.post(
  '/add-sleep',
  upload.fields([{ name: 'photo' }, { name: 'audio' }]),
  sleepController.addSleep
);
router.get('/all', sleepController.getAllSleepSounds);
router.get('/:soundId', sleepController.getSleepSoundById);
router.patch(
  '/update/:soundId',
  upload.fields([{ name: 'photo' }, { name: 'audio' }]),
  sleepController.updateSleepSound
);
router.delete('/delete/:soundId', sleepController.deleteSleepSound);

export default router;
