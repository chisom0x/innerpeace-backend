import { Router } from 'express';
import meditationController from '../controllers/meditation_controller';
import upload from '../middlewares/multer';

const router = Router()

router.post('/add-meditation', upload.single('photo') ,meditationController.addMeditation)
router.post('/topic/add-topic/:meditationId', upload.single('audio'), meditationController.addMeditationTopic)
router.get('/all', meditationController.getAllMeditation)
router.get('/:meditationId', meditationController.getMeditationById)
router.get('/topic/:meditationId', meditationController.getMeditationTopicById)

export default router