import React from "react";
import { Navbar } from "./Navbar";
import { useEffect, useState } from "react";

export const Layout = ({ children }) => {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }

      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // to prevent memory leaks and certain bugs
  }, []);
  return (
    <React.Fragment>
      <div className=" flex flex-col items-center mx-auto w-full">
        <Navbar isTopOfPage={isTopOfPage} setIsTopOfPage={setIsTopOfPage} />
        {children}
      </div>
    </React.Fragment>
  );
};
