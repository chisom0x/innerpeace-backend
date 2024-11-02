import { Router } from 'express';
import Authentication from '../controllers/auth_controller';

const router = Router();

router.post('/signup', Authentication.signUp);
router.post('/login', Authentication.login)

export default router;
