import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "../redux/features/auth/authSlice";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import PasswordInputAgain from "../components/PasswordInputAgain";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorPasswordAgain, setErrorPasswordAgain] = useState("");

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) navigate("/");
  }, [status, isAuth, navigate]);

  const handleSubmit = () => {
    if (password !== passwordAgain) {
      return toast("Error. Your password fields don't match together");
    }
    try {
      dispatch(registerUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="md:w-2/5 sm:w-2/4 xs:w-3/4 h-60 mx-auto mt-20 md:mt-40 "
    >
      <h1 className="text-lg text-center mb-2">Registration</h1>
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

        <PasswordInputAgain
          password={password}
          passwordAgain={passwordAgain}
          setPasswordAgain={setPasswordAgain}
          errorPasswordAgain={errorPasswordAgain}
          setErrorPasswordAgain={setErrorPasswordAgain}
        />

        <div className="flex flex-col gap-3 justify-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center text-md text-white rounded-full py-2 px-4  bg-blue-500 hover:bg-red-200"
          >
            Confirm
          </button>
          <div className="flex justify-start gap-1 items-start text-sm text-gray-500">
            <div>Do you already have an account? </div>
            <Link to={"/login"} className="text-black hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};
