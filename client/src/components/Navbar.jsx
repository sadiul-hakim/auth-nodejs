import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, counterfeit, setCounterfeit }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          DAPP-Auth
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {!loggedIn || counterfeit ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
            {loggedIn && !counterfeit ? (
              <>
                <li className="nav-item">
                  <NavLink to="/protected" className="nav-link">
                    Protected
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setCounterfeit(true);
                      navigate("/login");
                      localStorage.removeItem("user");
                    }}
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
