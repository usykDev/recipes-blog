import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

export const createComment = async (req, res) => {
  try {
    const { recipeId, comment } = req.body;

    if (!comment) return res.json({ message: "Comment cannot be empty" });

    const user = await User.findById(req.userId);

    const newComment = new Comment({
      comment,
      author_name: user.username,
    });

    await newComment.save();

    try {
      await Recipe.findByIdAndUpdate(recipeId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      console.log(error);
    }

    res.json(newComment);
  } catch (error) {
    res.json({ message: "Something went wrong" });
  }
};

export const removeComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);

    if (!comment) return res.json({ message: "Comment not found" });

    await Recipe.findByIdAndUpdate(req.params.recipeId, {
      $pull: { comments: req.params.commentId },
    });

    res.json({ message: "Your comment has been removed" });
  } catch (error) {
    res.json({ message: "Error deleting comment" });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const updatedComment = req.body;

    const comment = await Comment.findById(updatedComment.id);
    if (!comment) return res.json({ message: "Comment not found" });

    comment.comment = updatedComment.comment;

    await comment.save();

    res.json(comment);
  } catch (error) {
    res.json({ message: "Failed to edit comment" });
  }
};
