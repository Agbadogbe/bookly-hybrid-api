import { Router } from 'express';
import HybridController from '../controllers/hybridController.js'; 

const router = Router();
router.get("/user-full/:id", HybridController.getUserFull);
router.put("/user-full/:id", HybridController.updateUserFull);
router.delete("/user-full/:id", HybridController.deleteUserFull);

export default router;