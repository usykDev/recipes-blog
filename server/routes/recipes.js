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
router.post("/", checkAuth, createRecipe);

// Get all recipes
router.get("/", getAllRecipes);

// Get Recipe By Id
router.get("/:id", getById);

// Update recipe
router.put("/:id", checkAuth, updateRecipe);

// Get My Recipes
router.get("/user/me", checkAuth, getMyRecipes);

// remove recipe
router.delete("/:id", checkAuth, removeRecipe);

// Get Recipe Comments
router.get("/comments/:id", getRecipeComments);

export default router;
