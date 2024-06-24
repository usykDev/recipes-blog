import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  recipes: [],
  popularRecipes: [],
  loading: false,
  status: null,
};

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (params) => {
    try {
      const { data } = await axios.post("/recipes", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllRecipes = createAsyncThunk(
  "recipe/getAllRecipes",
  async () => {
    try {
      const { data } = await axios.get("/recipes");

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeRecipe = createAsyncThunk(
  "recipe/removeRecipe",
  async (id) => {
    try {
      const { data } = await axios.delete(`/recipes/${id}`, id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  "recipe/updateRecipe",
  async (updatedRecipe) => {
    try {
      const { data } = await axios.put(
        `/recipes/${updatedRecipe.id}`,
        updatedRecipe
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create recipe
      .addCase(createRecipe.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
        state.status = action.payload.message;
      })
      .addCase(createRecipe.rejected, (state) => {
        state.loading = false;
      })

      // get all recipes
      .addCase(getAllRecipes.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        state.recipes = action.payload.recipes;
        state.popularRecipes = action.payload.popularRecipes;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.status = action.password.message;
        state.loading = false;
      })

      // remove recipe
      .addCase(removeRecipe.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(removeRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload._id
        );
      })
      .addCase(removeRecipe.rejected, (state, action) => {
        state.status = action.password.message;
        state.loading = false;
      })

      // updating recipe
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        const index = state.recipes.findIndex(
          (recipe) => recipe._id === action.payload._id
        );
        state.recipes[index] = action.payload;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.status = action.payload.message;
        state.loading = false;
      });
  },
});

export default recipeSlice.reducer;
