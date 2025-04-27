import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

router.get("/api/posts", getPosts);
router.post("/api/posts", createPost);
router.delete("/api/posts/:id", deletePost);

export default router;
