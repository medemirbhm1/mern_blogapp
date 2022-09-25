import { Router } from "express";
import {
  getGategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.mjs";

const router = Router();
router.route("/").get(getGategories).post(addCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
