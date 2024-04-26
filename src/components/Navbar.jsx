import React, { useContext, useState, useEffect } from "react";
import {
  FaObjectGroup,
  FaUserPlus,
  FaHome,
  FaPlus,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
                to="/"
              >
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/signup") ? "active" : ""
                    }`}
                    to="/signup"
                  >
                    <FaUserPlus />
                    <span>Signup</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/login") ? "active" : ""
                    }`}
                    to="/login"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${
                      isActiveLink("/category") ? "active" : ""
                    }`}
                    
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaObjectGroup />
                    <span>Categories</span>
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/addPost") ? "active" : ""
                    }`}
                    to="/addPost"
                  >
                    <FaPlus />
                    <span>Add Post</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/logout") ? "active" : ""
                    }`}
                    to="/logout"
                  >
                    <span>Logout</span>
                    <FaSignOutAlt />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
