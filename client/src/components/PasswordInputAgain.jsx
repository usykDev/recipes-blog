import React, { useState } from "react";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg";

const PasswordInputAgain = ({
  password,
  passwordAgain,
  errorPasswordAgain,
  setPasswordAgain,
  setErrorPasswordAgain,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validatePasswordAgain = (value) => {
    if (!value) {
      setErrorPasswordAgain("Password is required");
    } else if (value !== password) {
      setErrorPasswordAgain("Password doesn't match");
    } else {
      setErrorPasswordAgain("");
    }
  };
  const handleChangePasswordAgain = (e) => {
    const value = e.target.value;
    setPasswordAgain(value);
    validatePasswordAgain(value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">Password again</label>
      <div className="relative">
        {" "}
        <input
          type={passwordVisible ? "text" : "password"}
          value={passwordAgain}
          onChange={handleChangePasswordAgain}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Repeat password please"
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
      {errorPasswordAgain && (
        <div className="text-orange-900 text-xs px-4 italic">
          {errorPasswordAgain}
        </div>
      )}
    </div>
  );
};

export default PasswordInputAgain;
