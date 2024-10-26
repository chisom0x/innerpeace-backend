import { Router } from 'express';
import upload from '../middlewares/multer.ts';
import dailyController from '../controllers/daily_controller';

const router = Router();

router.post(
  '/add-daily-sound',
  upload.single('audio'),
  dailyController.addDaily
);
router.get('/time', dailyController.getDailyByTime);
router.get('/:dailyId', dailyController.getDailyById);
router.patch(
  '/update/:dailyId',
  upload.single('audio'),
  dailyController.updateDaily
);

export default router;
