import React from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeComment } from "../redux/features/comment/commentSlice";
import { getRecipeComments } from "../redux/features/comment/commentSlice";
import { updateComment } from "../redux/features/comment/commentSlice";

export const CommentItem = ({ cmt }) => {
  const avatar = cmt.author_name.trim().toUpperCase().split("").slice(0, 2);
  const { user } = useSelector((state) => state.auth);
  const params = useParams();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(cmt.comment);

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 75%, 50%)`;
    return color;
  };

  const avatarBgColor = stringToColor(cmt.author_name);

  const fetchComments = useCallback(async () => {
    try {
      await dispatch(getRecipeComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, params.id]);

  const removeCommentHandler = async () => {
    try {
      const recipeId = params.id;
      const commentId = cmt._id;
      await dispatch(removeComment({ recipeId, commentId }));
      fetchComments();
      toast("Comment has been removed");
    } catch (error) {
      console.log(error);
    }
  };

  const saveCommentHandler = async () => {
    try {
      const cleanedComment = editedComment.replace(/[ ,.-=+*%$#@!&^()]/g, "");

      if (!cleanedComment) {
        return toast("You cannot edit to empty comment");
      }

      const commentId = cmt._id;
      const author_name = cmt.author_name;
      const updatedComment = new FormData();
      updatedComment.append("author_name", author_name);
      updatedComment.append("id", commentId);
      updatedComment.append("comment", editedComment);

      await dispatch(updateComment(updatedComment));
      setIsEditing(false);
      fetchComments();
      toast("Comment has been updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-comment items-center gap-3 border py-2 px-3 rounded-full border-gray-200">
      <div
        className="flex items-center justify-center shrink-0 rounded-full text-sm w-10 h-10"
        style={{ backgroundColor: avatarBgColor }}
      >
        {avatar}
      </div>
      {isEditing ? (
        <div className="flex text-xs">
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="border outline-0  p-1 rounded w-full"
          />
        </div>
      ) : (
        <div className="flex text-xs w-full break-all">{cmt.comment}</div>
      )}

      {user?.username === cmt.author_name && (
        <div className="flex text-xs flex-col gap-1 items-start">
          {isEditing ? (
            <>
              <button
                onClick={saveCommentHandler}
                className="text-green-700 font-bold hover:underline"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className=" hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={removeCommentHandler}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
