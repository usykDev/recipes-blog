import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  comments: [],
  loading: false,
  status: null,
};

export const createComment = createAsyncThunk(
  "comment/createComment",
  async ({ recipeId, comment }) => {
    try {
      const { data } = await axios.post(`/comments/${recipeId}`, {
        recipeId,
        comment,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ recipeId, commentId }) => {
    try {
      const { data } = await axios.delete(
        `/comments/${recipeId}/${commentId}`,
        {
          recipeId,
          commentId,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (updatedComment) => {
    try {
      const id = updatedComment.id;
      const { data } = await axios.put(`/comments/${id}`, updatedComment);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRecipeComments = createAsyncThunk(
  "comment/getRecipeComments",
  async (recipeId) => {
    try {
      const { data } = await axios.get(`/recipes/comments/${recipeId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.loading = false;
      })

      // getting all comments
      .addCase(getRecipeComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecipeComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getRecipeComments.rejected, (state) => {
        state.loading = false;
      })

      // removing  comments
      .addCase(removeComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })
      .addCase(removeComment.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
      })

      // updating comment
      .addCase(updateComment.pending, (state) => {
        state.loading = true;
        state.status = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.message;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        state.comments[index] = action.payload;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = action.payload.message;
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
