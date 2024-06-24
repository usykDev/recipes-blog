import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { RecipeItem } from "../components/RecipeItem";
import { PopularRecipes } from "../components/PopularRecipes";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../redux/features/recipe/recipeSlice";

export const MainPage = () => {
  const dispatch = useDispatch();

  const { recipes, popularRecipes } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  if (!recipes.length) {
    return <div className="text-xl text-center py-10">No recipes yet</div>;
  }
  return (
    <div className="flex sm:w-4/6 xxs:w-5/6 mx-auto sm:py-10 xxs:py-4">
      <div className="flex sm:justify-between xxs:justify-center md:gap-8 xxs:gap-4">
        <div className="flex flex-col gap-10 sm:basis-4/5">
          {recipes?.map((recipe, idx) => (
            <RecipeItem key={idx} recipe={recipe} />
          ))}
        </div>
        <div className="md:basis-1/5  flex-col gap-4 xxs:hidden sm:flex sm:basis-2/6">
          <div className="text-sm uppercase text-center bg-white rounded-full py-2 px-4">
            Popular Recipes:
          </div>

          {popularRecipes?.map((recipe, idx) => (
            <PopularRecipes key={idx} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};
