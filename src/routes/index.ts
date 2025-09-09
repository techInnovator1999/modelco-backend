import { Router } from 'express';
import { router as formRouter } from './v1/forms.routes';

export const router = Router();

router.use('/v1/forms', formRouter);


