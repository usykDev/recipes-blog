import axios from "../utils/axios";
import { marked } from "marked";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  getRecipeComments,
} from "../redux/features/comment/commentSlice";
import { removeRecipe } from "../redux/features/recipe/recipeSlice";
import { toast } from "react-toastify";
import { getMe } from "../redux/features/auth/authSlice";
import { CommentItem } from "../components/CommentItem";

export const RecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const confirmRemoveRecipeHandler = async () => {
    try {
      await dispatch(removeRecipe(params.id));
      toast("Recipe has been removed");
      navigate("/recipes");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    confirmRemoveRecipeHandler();
    setShowModal(false);
  };

  const handleSubmit = () => {
    try {
      const recipeId = params.id;

      const cleanedComment = comment.replace(/[ ,.-=+*%$#@!&^()]/g, "");

      if (!user) {
        return toast("Log in to your account to post a comment");
      }

      if (!cleanedComment) {
        return toast("You cannot send empty comment");
      }

      dispatch(createComment({ recipeId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecipe = useCallback(async () => {
    await dispatch(getRecipeComments(params.id));
    const { data } = await axios.get(`/recipes/${params.id}`);

    setRecipe(data);
  }, [dispatch, params.id]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  useEffect(() => {
    if (!user) {
      dispatch(getMe());
    }
  }, [user, dispatch]);

  if (!recipe) {
    return <div className="text-xl text-center py-10">Loading ...</div>;
  }

  const renderMarkdown = (text) => {
    const markdownText = text || "";

    try {
      const html = marked(markdownText, { breaks: true }); // breaks: true respects line breaks
      return { __html: html };
    } catch (error) {
      console.error("Error rendering markdown:", error);
      return { __html: "<p>Error rendering markdown</p>" };
    }
  };

  return (
    <div className="flex flex-col xs:w-4/6 sm:w-4/6 xxs:w-5/6 items-center py-8 gap-4">
      <div className="flex flex-row justify-start w-full">
        <button className="flex items-baseline bg-white hover:bg-blue-500 hover:text-white text-sm rounded-full py-2 px-4">
          <Link to={"/"}>Back</Link>
        </button>
      </div>
      <div className="flex gap-4 xxs:flex-col sm:flex-row  items-center sm:items-start">
        <div className="sm:w-4/6">
          <div className="flex flex-col">
            <div
              className={
                recipe?.imgUrl
                  ? "flex rounded-sm xxs:h-72 md:h-96"
                  : "flex rounded-sm"
              }
            >
              {recipe?.imgUrl && (
                <img
                  src={`http://localhost:3002/${recipe?.imgUrl}`}
                  alt="img"
                  className="object-cover w-full rounded-xl"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-sm  opacity-50">{recipe.username}</div>
            <div className="text-sm  opacity-50">
              <Moment date={recipe.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-xl font-bold">{recipe.title}</div>

          <p
            className="opacity-90 text-md pt-4"
            dangerouslySetInnerHTML={renderMarkdown(recipe.text)}
          />

          <div className="flex gap-3 items-center mt-4 justify-between">
            <div className="flex gap-3 ">
              <button
                className="flex items-center justify-center gap-2 text-sm opacity-50"
                title={`${recipe.views} views`}
              >
                <AiFillEye />
                <span>{recipe.views}</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 text-sm opacity-50"
                title={`${recipe.comments?.length || 0} comments`}
              >
                <AiOutlineMessage /> <span>{recipe.comments?.length || 0}</span>
              </button>
            </div>

            {user?._id === recipe.author && (
              <div className="flex gap-3">
                <button
                  title="Edit"
                  className="flex items-center justify-center gap-2 text-xl opacity-50 hover:opacity-100"
                >
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  title="Delete"
                  onClick={handleDeleteClick}
                  className="flex items-center justify-center gap-2 text-xl opacity-50 hover:opacity-100"
                >
                  <AiFillDelete />
                </button>

                {showModal && (
                  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center">
                      <h2 className="text-xl mb-4">
                        Are you sure you want to delete this recipe?
                      </h2>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={handleConfirmDelete}
                          className="bg-red-500 hover:bg-red-600  text-white py-2 px-4 rounded-full"
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={handleCloseModal}
                          className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-full"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* COMMENTS */}
        <div className="sm:w-3/6 xxs:w-full flex gap-3 p-4 justify-center flex-col bg-white rounded-3xl">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-full bg-white border py-2 px-4 text-sm outline-none placeholder:text-gray-400"
              disabled={!user}
              title={user ? "" : "Log in to your account to write a comment"}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className={`${
                user
                  ? "hover:bg-beige-400 hover:text-black cursor-pointer"
                  : "cursor-default"
              } flex justify-center items-center  text-blue-500 bg-beige-300 text-sm rounded-full py-2 px-4`}
            >
              Send
            </button>
          </form>

          <div className="flex flex-col gap-2">
            {comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
