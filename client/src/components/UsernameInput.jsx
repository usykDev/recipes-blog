import React, { useState } from "react";

const UsernameInput = ({
  username,
  setUsername,
  errorUsername,
  setErrorUsername,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const validateUsername = (value) => {
    if (!value) {
      setErrorUsername("Username is required");
    } else if (/\s/.test(value)) {
      setErrorUsername("Username should not contain spaces");
    } else if (value.length < 3) {
      setErrorUsername("Username must be at least 3 characters long");
    } else {
      setErrorUsername("");
    }
  };

  const handleChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-500">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleChangeUsername}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Username"
        className="text-black w-full rounded-full bg-white border py-2 px-4 text-sm outline-none placeholder:text-gray-400"
      />
      {errorUsername && isFocused && (
        <div className="text-red-500 text-xs px-4">{errorUsername}</div>
      )}
    </div>
  );
};

export default UsernameInput;
