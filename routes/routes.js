import express from "express";
import upload from "../middlewares/upload.js";
import {
  fetchAllPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postCrtl.js";

const router = express.Router();

router.get("/", fetchAllPosts);
router.get("/:id", fetchPostById);
router.post("/", upload.single("image"), createPost);
router.patch("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);

export default router;
