import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

// Get all posts
router.get("/", getPosts);

// Get single posts
router.get("/:id", getPost);

// Create New Post
router.post("/", createPost);

// Update Posts
router.put("/:id", updatePost);

// Delete Posts
router.delete("/:id", deletePost);

export default router;
