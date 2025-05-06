import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { addContributorController, getContributorsController, removeContributorController } from '../controllers/contributorController';  // Импорт контроллеров

const router = Router();

router.post('/contributors', authenticateToken, addContributorController);  // Используйте контроллеры с правильными типами
router.get('/contributors/:story_id', authenticateToken, getContributorsController);
router.delete('/contributors/:id', authenticateToken, removeContributorController);

export default router;