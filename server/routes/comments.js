import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import {
  createComment,
  removeComment,
  updateComment,
} from "../controllers/comment.js";

const router = new Router();

// Create comment
router.post("/:id", checkAuth, createComment);

// Remove comment
router.delete("/:recipeId/:commentId", checkAuth, removeComment);

// Update comment
router.put("/:id", checkAuth, updateComment);

export default router;
