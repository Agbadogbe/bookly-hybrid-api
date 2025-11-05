import { Router } from 'express'
import ctrl from '../controllers/userController.js';

const router = Router();

router.get("/", ctrl.listUsers);
router.get("/:id", ctrl.getUser);
router.post("/", ctrl.createUser);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

export default router;