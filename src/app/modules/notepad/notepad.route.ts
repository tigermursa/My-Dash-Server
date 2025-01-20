import { Router } from 'express';
import {
  getContentNotePadController,
  getContentIdeaController,
  updateContentNotePadController,
  updateContentIdeaController,
  clearContentNotePadController,
  clearContentIdeaController,
} from './notepad.controller';

const router = Router();

router.get('/notepad/:userId', getContentNotePadController);
router.get('/idea/:userId', getContentIdeaController);

router.patch('/notepad/:userId', updateContentNotePadController);
router.patch('/idea/:userId', updateContentIdeaController);

router.patch('/notepad/clear/:userId', clearContentNotePadController);
router.patch('/idea/clear/:userId', clearContentIdeaController);

export default router;
