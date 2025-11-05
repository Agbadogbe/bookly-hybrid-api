import { Router } from 'express'
import ProfileController from '../controllers/profileController.js';

const router = Router();

router.get("/:userId/profile", ProfileController.getProfile);
router.post("/:userId/profile", ProfileController.createProfile);
router.put("/:userId/profile", ProfileController.updateProfile);
router.delete("/:userId/profile", ProfileController.deleteProfile);

export default router;