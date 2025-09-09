import { Router } from 'express';
import { submitFormController } from '../../controllers/forms.controller';

export const router = Router();

router.post('/submit', submitFormController);


