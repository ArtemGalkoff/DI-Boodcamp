import express, { Request, Response, NextFunction } from 'express';
import { getUserProfile, 
  createUserController, 
  updateUserController, 
  findUserByEmailController, 
  findUserByIdController, 
  deleteUserController, 
  getAllUsersController, 
  uploadUserPhotosController,
  } from '../controllers/userController';
import { deletePhotoController } from '../controllers/deletePhotoController'
  import  { authMiddleware }  from '../middleware/authMiddleware'
import { upload } from '../middleware/upload';

const router = express.Router();

const wrapAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.get('/profile/:id', wrapAsync(getUserProfile));
router.get('/profile', authMiddleware, wrapAsync(getUserProfile));
router.put('/profile/:id', wrapAsync(updateUserController));
router.post('/', wrapAsync(createUserController));
router.get('/email/:email', wrapAsync(findUserByEmailController));  
router.get('/id/:id', wrapAsync(findUserByIdController));
router.delete('/profile/:id', wrapAsync(deleteUserController));
router.delete('/profile/:userId/photos/:publicId', authMiddleware, wrapAsync(deletePhotoController));
router.get('/', getAllUsersController);
router.post('/profile/:id/photos',  upload.array('photos', 5), wrapAsync(uploadUserPhotosController)
);

export default router;