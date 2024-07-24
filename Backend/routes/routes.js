import express from 'express';
import controller from '../controllers/controller.js';

const router = express.Router();

router.get('/video/:filename', controller.getVideo);

router.post('/progress', controller.postProgress);

router.get('/progress/:filename', controller.getProgress);