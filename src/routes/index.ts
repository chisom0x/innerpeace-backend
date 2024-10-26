import { Router } from 'express';
import authRouter from './auth_routes.ts';
import emotionsRouter from './emotions_routes.ts';
import sleepRouter from './sleep_routes.ts';
import dailyRouter from './daily_routes.ts';
import meditationRouter from './meditation_routes.ts';
import rantRouter from './rants_routes.ts';

const router = Router();

router.use('/auth', authRouter);
router.use('/emotions', emotionsRouter);
router.use('/sleep', sleepRouter);
router.use('/daily', dailyRouter);
router.use('/meditation', meditationRouter);
router.use('/rant', rantRouter);

export default router;
