import { Router } from 'express';
import uploadController from '../controllers/uploadController';
import confirmController  from '../controllers/confirmController';
import listController from '../controllers/listController';

const router = Router();

router.post('/upload', uploadController);
router.patch('/confirm', confirmController);
router.get('/:customer_code/list', listController);

export default router;
