import { Router } from "express";

import { checkAuth } from "../utils/checkAuth.js";
import {
  createComment,
  removeComment,
  updateComment,
} from "../controllers/comment.js";

const router = new Router();

// Create comment
// http://localhost:3002/api/comments/:id
router.post("/:id", checkAuth, createComment);

// Remove comment
// http://localhost:3002/api/comments/:recipeId/:commentId
router.delete("/:recipeId/:commentId", checkAuth, removeComment);

// Update comment
// http://localhost:3002/api/comments/:id
router.put("/:id", checkAuth, updateComment);

export default router;
