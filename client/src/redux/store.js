import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import recipeSlice from "./features/recipe/recipeSlice";
import commentSlice from "./features/comment/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    recipe: recipeSlice,
    comment: commentSlice,
  },
});
