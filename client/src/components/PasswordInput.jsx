import React, { useState } from "react";
import eye from "../assets/eye.svg";
import { useLocation } from "react-router-dom";
import eyeSlash from "../assets/eye-slash.svg";

const PasswordInput = ({
  password,
  errorPassword,
  setPassword,
  setErrorPassword,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (location.pathname === "/register") {
      if (!value) {
        setErrorPassword("Password is required");
      } else if (/\s/.test(value)) {
        setErrorPassword("Password should not contain spaces");
      } else if (!passwordRegex.test(value)) {
        setErrorPassword(
          "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, and 1 number"
        );
      } else {
        setErrorPassword("");
      }
    }
  };
  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">Password</label>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          onChange={handleChangePassword}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Password"
          className="text-black w-full rounded-full bg-white border py-2 px-4 text-sm outline-none placeholder:text-gray-400"
        />

        {passwordVisible ? (
          <img
            className="absolute top-2 right-4"
            onClick={() => setPasswordVisible(false)}
            title="hide password"
            src={eyeSlash}
            width={20}
            height={20}
          />
        ) : (
          <img
            className="absolute top-2 right-4"
            onClick={() => setPasswordVisible(true)}
            title="see password"
            src={eye}
            width={20}
            height={20}
          />
        )}
      </div>
      {errorPassword && (
        <div className="text-orange-900 text-xs px-4 italic">
          {errorPassword}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
