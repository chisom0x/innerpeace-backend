import { Router } from 'express';
import authRouter from './auth_routes';
import emotionsRouter from './emotions_routes';
import sleepRouter from './sleep_routes';
import dailyRouter from './daily_routes';
import meditationRouter from './meditation_routes';
import rantRouter from './rants_routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/emotions', emotionsRouter);
router.use('/sleep', sleepRouter);
router.use('/daily', dailyRouter);
router.use('/meditation', meditationRouter);
router.use('/rant', rantRouter);

export default router;
