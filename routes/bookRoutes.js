import { Router } from 'express'; 
import bookController from '../controllers/bookController.js';

const router = Router();
router.get("/", bookController.listBooks);
router.get("/:id", bookController.getBook);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;