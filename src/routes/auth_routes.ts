import { Router } from 'express';
import Authentication from '../controllers/auth_controller.ts';

const router = Router();

router.post('/signup', Authentication.signUp);
router.post('/login', Authentication.login)

export default router;
