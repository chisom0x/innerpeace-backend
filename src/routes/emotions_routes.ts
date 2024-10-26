import { Router } from 'express';
import EmotionsController from '../controllers/emotions_controller.ts';

const router = Router();

router.post('/add-emotion', EmotionsController.addEmotion);
router.post('/add-emotion-cause', EmotionsController.addEmotionCauses);
router.get('/', EmotionsController.getEmotions);
router.get('/causes', EmotionsController.getEmotionCauses);

router.post('/new-daily-entry', EmotionsController.addDailyEmotion)
router.get('/current-week', EmotionsController.getCurrentWeekEmotion)
router.get('/all-user-emotions', EmotionsController.getUserEmotions)

export default router;
