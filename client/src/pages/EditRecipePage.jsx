import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import { updateRecipe } from "../redux/features/recipe/recipeSlice";
import { toast } from "react-toastify";

export const EditRecipePage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchRecipe = useCallback(async () => {
    const { data } = await axios.get(`/recipes/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imgUrl);
  }, [params.id]);

  const submitHandler = async () => {
    if (!title || !text) {
      return toast.error("Error editing recipe. Please fill in all fields");
    }
    try {
      const updatedRecipe = new FormData();
      updatedRecipe.append("title", title);
      updatedRecipe.append("text", text);
      updatedRecipe.append("id", params.id);
      updatedRecipe.append("image", newImage);
      await dispatch(updateRecipe(updatedRecipe));
      toast("This recipe has been updated");
      navigate("/recipes");
    } catch (error) {
      toast("Error updating recipe");
    }
  };

  const clearFormHandler = () => {
    setTitle("");
    setText("");
    navigate("/recipes");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setNewImage(e.target.files[0]);
      setOldImage("");
    } else {
      toast("Please select a valid image file (PNG or JPEG)");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <form
      className="sm:w-4/6 xxs:w-5/6  mx-auto flex flex-col py-10 gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="text-gray-600 py-2 bg-white text-sm mt-2 cursor-pointer flex items-center justify-center border-2 border-dotted">
        Attach an image:
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        ></input>
      </label>
      <div className="flex object-cover justify-center">
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />
        )}
        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <div>
        <label className="text-sm  opacity-70">Recipe title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mt-1 text-black w-full rounded-lg bg-white border p-2 text-xs outline-none placeholder:text-gray-700"
        />
      </div>
      <div>
        <label className="text-sm  opacity-70">Recipe text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className="mt-1 text-black w-full rounded-lg bg-white border p-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </div>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center text-blue-500 bg-beige-300 hover:bg-beige-400 hover:text-black rounded-full py-1 px-4"
        >
          Update
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-500 hover:bg-red-400 rounded-full py-1 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
