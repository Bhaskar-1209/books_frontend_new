import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/auth");
  };

  return (
    <nav className="bg-black text-white shadow-md border-r border-gray-800 h-screen fixed top-0 left-0 w-[20%] py-6 px-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <NavLink to="/" className="text-xl font-bold text-white">
          THE BOOK
        </NavLink>

        <ul className="mt-6 space-y-1">
          <li>
            <NavLink
              to="/discover"
              className={({ isActive }) =>
                `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span>Discover</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span>Category</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/downloads"
              className={({ isActive }) =>
                `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span>Downloads</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/favourite"
              className={({ isActive }) =>
                `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span>Favourites</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                  isActive
                    ? "bg-gray-800 text-yellow-400 font-semibold"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span>Profile</span>
            </NavLink>
          </li>

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/userList"
                  className={({ isActive }) =>
                    `flex items-center text-[15px] px-4 py-2 rounded transition-all ${
                      isActive
                        ? "bg-gray-800 text-yellow-400 font-semibold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <span>User List</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/uploadBook"
                  className={({ isActive }) =>
                    `block text-[15px] px-4 py-2 rounded transition-all ${
                      isActive
                        ? "bg-gray-800 text-yellow-400 font-semibold"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  Upload Books
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Bottom Section - Fixed Logout Button */}
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
