import { Router } from 'express';
import { validateRegistration, validateLogin } from '../helpers/validationHelpers'; // Импорт валидации
import { registerUser, loginUser } from '../controllers/authController'; // Импорт контроллеров

const router = Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;