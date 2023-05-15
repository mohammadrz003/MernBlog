import express from 'express'
const router = express.Router();
import { loginUser, registerUser, updateProfile, updateProfilePicture, userProfile } from '../controllers/userControllers.js';
import { authGuard } from '../middleware/authMiddleware.js';

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/profile", authGuard, userProfile)
router.put("/updateProfile", authGuard, updateProfile)
router.put("/updateProfilePicture", authGuard, updateProfilePicture)

export default router