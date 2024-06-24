import React from "react";
import { Link } from "react-router-dom";

export const PopularRecipes = ({ recipe }) => {
  return (
    <div>
      <Link
        to={`/${recipe._id}`}
        className="flex text-sm text-black hover:underline  px-3"
      >
        {recipe.title}
      </Link>
    </div>
  );
};
