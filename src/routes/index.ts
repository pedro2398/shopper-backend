import express from 'express';
import { Router } from 'express';
import uploadController from '../controllers/uploadController';
import confirmController  from '../controllers/confirmController';
import { measuresController } from '../controllers/ measuresController';

const router = Router();

router.get('/upload', uploadController);
router.get('/confirm', confirmController);
router.get('/list', measuresController);

export default router;
