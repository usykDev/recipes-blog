import axios from "../utils/axios";
import React from "react";
import { useState, useEffect } from "react";
import { RecipeItem } from "../components/RecipeItem";

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchMyRecipes = async () => {
    try {
      const { data } = await axios.get("/recipes/user/me");
      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  return (
    <div className="xxs:w-5/6 sm:w-4/6 items-center  mx-auto py-10 flex flex-col gap-10 xxs:py-4">
      {recipes.length > 0 ? (
        recipes.map((recipe, idx) => <RecipeItem recipe={recipe} key={idx} />)
      ) : (
        <div className="md:mt-8 md:text-xl xxs:text-sm italic text-gray-500">
          No recipes contributed
        </div>
      )}
    </div>
  );
};
