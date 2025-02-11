import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Logo from "../assets/logo-new-recipes.png";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../hooks/useMediaQuery";
import bar from "../assets/bar.svg";
import xMark from "../assets/x-mark.svg";

export const Navbar = ({ isTopOfPage, setIsTopOfPage }) => {
  const isAuth = useSelector(checkIsAuth);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbarBackground = isTopOfPage
    ? isMenuToggled
      ? ""
      : "sticky z-10 top-0"
    : isMenuToggled
    ? ""
    : "bg-beige-300 drop-shadow sticky z-10 top-0";
  const isAboveMediumScreens = useMediaQuery("(min-width: 930px)");

  const activeStyles = {
    color: "black",
    fontWeight: "bold",
    backgroundColor: "#EAD5C5",
    borderRadius: "50px",
  };

  const nonActiveStyles = !isAuth ? { color: "gray" } : {};

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/");
    toast("You logged out");
  };

  useEffect(() => {});

  const toggleMenu = () => {
    setIsMenuToggled(!isMenuToggled);
  };

  return (
    <nav
      className={`${navbarBackground} flex xxs:px-6 sm:px-12 justify-between items-center py-2 w-full`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex justify-center gap-2 items-center w-20 h-20  rounded-sm"
        title="Main page"
      >
        <img className="drop-shadow-3xl" alt="logo" src={Logo} />
      </Link>

      {/* Menu */}
      {isAboveMediumScreens && (
        <div>
          <ul className="flex gap-8  items-center text-center text-lg w-full">
            <li>
              <NavLink
                to="/"
                className="text-black hover:bg-white hover:rounded-full xxs:py-0 xs:py-2 md:py-2 xxs:px-1 xs:px-3 md:px-4"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                to={isAuth && "/recipes"}
                className={`text-black xxs:py-0 xs:py-2 md:py-2 xxs:px-1 xs:px-3 md:px-4 ${
                  isAuth
                    ? "hover:bg-white hover:rounded-full"
                    : "cursor-default"
                }`}
                style={({ isActive }) =>
                  isAuth && isActive ? activeStyles : nonActiveStyles
                }
                title={!isAuth ? "Please log in to your account" : undefined}
              >
                My recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={isAuth && "/new"}
                className={`text-black xxs:py-0 xs:py-2 md:py-2 xxs:px-1 xs:px-3 md:px-4 ${
                  isAuth
                    ? "hover:bg-white hover:rounded-full"
                    : "cursor-default"
                }`}
                style={({ isActive }) =>
                  isAuth && isActive ? activeStyles : nonActiveStyles
                }
                title={!isAuth ? "Please log in to your account" : undefined}
              >
                Add recipe
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Button / Bar */}
      <div className="flex justify-center items-center">
        {isAboveMediumScreens ? (
          isAuth ? (
            <button
              onClick={logoutHandler}
              className="xxs:text-xs xs:text-lg bg-blue-100 drop-shadow-3xl rounded-full xxs:px-2 xs:px-3 md:px-4 xxs:py-1 xs:py-2 md:py-2 hover:bg-blue-500 hover:text-white"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="xxs:text-xs xs:text-lg bg-blue-100 drop-shadow-3xl rounded-full xxs:px-2 xs:px-3 md:px-4 xxs:py-1 xs:py-2 md:py-2 hover:bg-blue-500 hover:text-white"
            >
              Log in
            </Link>
          )
        ) : (
          <button
            className="drop-shadow-3xl rounded-full"
            onClick={() => {
              setIsMenuToggled(!isMenuToggled);
            }}
          >
            <img src={bar} width={30} height={30} alt="Menu" />
          </button>
        )}
      </div>

      {/* Menu Modal */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed bottom-0 right-0 z-40 h-full w-[200px] bg-beige-300 drop-shadow-xl">
          {/* Close Icon */}
          <div className="flex justify-end p-8">
            <button onClick={toggleMenu}>
              <img src={xMark} width={26} height={26} alt="Close Menu" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="ml-[20%] flex flex-col items-start gap-6">
            <ul className="flex flex-col xxs:gap-6 xs:gap-4 md:gap-8 justify-evenly items-start text-center text-lg">
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) =>
                    isActive ? activeStyles : undefined
                  }
                  onClick={() => setIsMenuToggled(false)}
                >
                  Main
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={isAuth ? "/recipes" : "/"}
                  style={({ isActive }) =>
                    isAuth && isActive ? activeStyles : nonActiveStyles
                  }
                  onClick={() => setIsMenuToggled(false)}
                >
                  My recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={isAuth ? "/new" : "/"}
                  style={({ isActive }) =>
                    isAuth && isActive ? activeStyles : nonActiveStyles
                  }
                  onClick={() => setIsMenuToggled(false)}
                >
                  Add recipe
                </NavLink>
              </li>
            </ul>

            <div className="flex justify-center text-md items-center bg-blue-100 drop-shadow-3xl rounded-full px-4 md:px-4  py-2 md:py-2 hover:bg-blue-500 hover:text-white">
              {isAuth ? (
                <button onClick={logoutHandler} className=" md:text-base">
                  Log out
                </button>
              ) : (
                <Link
                  to="/login"
                  className=" md:text-base"
                  onClick={() => setIsMenuToggled(false)}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
