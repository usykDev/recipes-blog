import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../redux/features/recipe/recipeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddRecipePage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      if (!title || !text) {
        return toast("Please fill out all fields to create a recipe");
      }
      const data = new FormData();
      data.append("title", title);
      data.append("text", text);
      data.append("image", image);
      await dispatch(createRecipe(data));
      toast("New recipe has been added");
      navigate("/");
    } catch (error) {
      toast("Error adding recipe");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImage(file);
    } else {
      toast("Please select a valid image file (PNG or JPEG)");
    }
  };

  const clearFormHandler = () => {
    setImage("");
    setText("");
    setTitle("");
    navigate("/");
  };

  return (
    <form
      className="sm:w-4/6 xxs:w-5/6 mx-auto flex flex-col py-10 gap-2"
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
      <div className="flex object-cover  justify-center">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
      </div>

      <div>
        <label className="text-sm  text-gray-500">Recipe title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mt-1 text-black w-full rounded-xl bg-white border p-2 text-sm outline-none placeholder:text-gray-500"
        />
      </div>

      <div>
        <label className="text-sm  text-gray-500">Recipe text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
          className="mt-1 text-red w-full rounded-xl bg-white border p-2 text-sm outline-none resize-none h-40 placeholder:text-gray-500"
        />
      </div>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center text-blue-500 bg-beige-300 hover:bg-beige-400 hover:text-black rounded-full py-1 px-4"
        >
          Add
        </button>

        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center  bg-red-500 hover:bg-red-400 rounded-full py-1 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
