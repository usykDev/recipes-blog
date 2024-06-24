import Recipe from "../models/Recipe.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// create recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, text } = req.body;

    const user = await User.findById(req.userId);

    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));

      const newRecipeWithImage = new Recipe({
        username: user.username,
        title,
        text,
        imgUrl: filename,
        author: req.userId,
      });

      await newRecipeWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { recipes: newRecipeWithImage._id },
      });

      return res.json({
        newRecipeWithImage,
        message: "You have added new recipe",
      });
    }

    const newRecipeWithoutImage = new Recipe({
      username: user.username,
      title,
      text,
      imgUrl: "",
      author: req.userId,
    });

    await newRecipeWithoutImage.save();

    await User.findByIdAndUpdate(req.userId, {
      $push: { recipes: newRecipeWithoutImage._id },
    });

    return res.json({
      newRecipeWithoutImage,
      message: "You have added new recipe",
    });
  } catch (err) {
    res.json({ message: "Failed to create recipes" });
  }
};

// get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort("-createdAt");
    const popularRecipes = await Recipe.find().limit(5).sort("-views");

    if (!recipes) {
      return res.json({ message: "No recipes" });
    }

    res.json({ recipes, popularRecipes });
  } catch (error) {
    res.json({ message: "Failed to retrieve recipes" });
  }
};

export const getById = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

    res.json(recipe);
  } catch (error) {
    res.json({ message: "Failed to get recipe" });
  }
};

// get my recipes
export const getMyRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.recipes.map((recipe) => {
        return Recipe.findById(recipe._id);
      })
    );
    res.json(list);
  } catch (error) {
    res.json({ message: "Failed to get recipe" });
  }
};

// remove recipe
export const removeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.message({ message: "This recipe is not existing" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { recipes: req.params.id },
    });
    res.json({ message: "This recipe is removed" });
  } catch (error) {
    res.json({ message: "Failed to get recipe" });
  }
};

// update recipe
export const updateRecipe = async (req, res) => {
  try {
    const { title, text, id } = req.body;
    const recipe = await Recipe.findById(id);

    if (req.files) {
      let filename = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", filename));
      recipe.imgUrl = filename || "";
    }

    recipe.title = title;
    recipe.text = text;

    await recipe.save();

    res.json(recipe);
  } catch (error) {
    res.json({ message: "Failed to get recipe" });
  }
};

// get Recipe Comments
export const getRecipeComments = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    const list = await Promise.all(
      recipe.comments.map((comment) => {
        return Comment.findById(comment);
      })
    );

    res.json(list);
  } catch (error) {
    res.json({ message: "Failed to get comment" });
  }
};
