import { Router } from "express";
import {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postControllers.mjs";

const router = Router();
router.route("/").get(getPosts).post(addPost);
router.route("/:id").get(getPost).delete(deletePost).put(updatePost);

export default router;
