import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import {
  createRecipe,
  getAllRecipes,
  getById,
  getMyRecipes,
  removeRecipe,
  updateRecipe,
  getRecipeComments,
} from "../controllers/recipes.js";

const router = new Router();

// Create recipe
// http://localhost:3002/api/recipes
router.post("/", checkAuth, createRecipe);

// Get all recipes
// http://localhost:3002/api/recipes
router.get("/", getAllRecipes);

// Get Recipe By Id
// http://localhost:3002/api/recipes/:id
router.get("/:id", getById);

// Update recipe
// http://localhost:3002/api/recipes/:id
router.put("/:id", checkAuth, updateRecipe);

// Get My Recipes
// http://localhost:3002/api/recipes/user/me
router.get("/user/me", checkAuth, getMyRecipes);

// remove recipe
// http://localhost:3002/api/recipes/:id
router.delete("/:id", checkAuth, removeRecipe);

// Get Recipe Comments
// http://localhost:3002/api/recipes/comments/:id
router.get("/comments/:id", getRecipeComments);

export default router;
