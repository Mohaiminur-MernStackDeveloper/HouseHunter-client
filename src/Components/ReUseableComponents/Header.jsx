import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContextAPI/ContextAPI";
import GetUser from "../CustomHook/GetUser";
import Swal from "sweetalert2";
import HouseOwner from "../HouseOwnerDashboard/HouseOwner";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = GetUser();
    setUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("access-token");
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout User Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/login")
  };

  // Header menu is here
  const HeaderMenu = (
    <>
      {user && (
        <>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isActive && "text-yellow-500"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={user.role == "HouseRenter" ? "/houserent" : "/houseowner"}
              className={({ isActive }) => isActive && "text-yellow-500"}
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-200">
      <div className="navbar bg-transparent w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {HeaderMenu}
            </ul>
          </div>
          <NavLink to="/" className="font-bold font-Inter text-lg">
            House<span className="text-yellow-500">Hunter</span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-5 text-sm font-Inter menu-horizontal px-1">
            {HeaderMenu}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <button onClick={handleLogout} className="font-Inter font-bold">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="font-Inter font-bold">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
