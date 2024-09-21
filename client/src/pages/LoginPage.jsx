import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { status } = useSelector((state) => state.auth);

  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="md:w-2/5 sm:w-2/4 xs:w-3/4 h-60 mx-auto mt-20 md:mt-40 "
    >
      <h1 className="text-lg text-center mb-2">Authorization</h1>
      <div className="flex flex-col gap-2">
        <UsernameInput
          username={username}
          setUsername={setUsername}
          errorUsername={errorUsername}
          setErrorUsername={setErrorUsername}
        />

        <PasswordInput
          password={password}
          setPassword={setPassword}
          errorPassword={errorPassword}
          setErrorPassword={setErrorPassword}
        />

        <div className="flex flex-col gap-3 justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center text-md text-white rounded-full py-2 px-4 bg-red-200 hover:bg-blue-500"
          >
            Log in
          </button>
          <div className="flex justify-start gap-1 items-start text-sm text-gray-500">
            <div>Don't you have an account yet? </div>
            <Link to={"/register"} className="text-black hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
