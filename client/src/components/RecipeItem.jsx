import React from "react";
import { marked } from "marked";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export const RecipeItem = ({ recipe }) => {
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
    <Link className="flex" to={`/${recipe._id}`}>
      <div className="flex flex-col md:basis-1/4 xs:basis-10 w-full  flex-grow">
        <div
          className={
            recipe.imgUrl
              ? "flex rounded-sm xxs:h-72 md:h-96"
              : "flex rounded-sm"
          }
        >
          {recipe.imgUrl && (
            <img
              src={`http://localhost:3002/${recipe.imgUrl}`}
              alt="img"
              className="object-cover w-full rounded-xl"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-sm  opacity-50">{recipe.username}</div>
          <div className="text-sm  opacity-50">
            <Moment date={recipe.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-xl font-bold">{recipe.title}</div>
        {/* <p className="opacity-60 text-sm pt-4 line-clamp-4">{recipe.text}</p> */}
        <p
          className="opacity-80 text-sm pt-4 line-clamp-4"
          dangerouslySetInnerHTML={renderMarkdown(recipe.text)}
        />

        <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-sm opacity-50">
            <AiFillEye /> <span>{recipe.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-sm opacity-50">
            <AiOutlineMessage /> <span>{recipe.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
