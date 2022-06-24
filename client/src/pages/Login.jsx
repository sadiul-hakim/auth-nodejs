import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({
  login,
  loginHandleChange,
  loginError,
  userLogin,
  loggedIn,
  counterfeit,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn && !counterfeit) {
      navigate("/protected");
    }
  }, [loggedIn, counterfeit, navigate]);
  return (
    <div className="container">
      <form className="card w-50 mx-auto mt-5" onSubmit={login}>
        <div className="card-header">
          <h3 className="text-dark">Login User</h3>
        </div>
        <div className="card-body">
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            aria-label="hidden"
            className="form-control mb-2"
            value={userLogin.email}
            onChange={loginHandleChange}
          />
          {loginError && <p className="error-message">{loginError.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="enter your password"
            aria-label="hidden"
            className="form-control mb-2"
            value={userLogin.password}
            onChange={loginHandleChange}
          />
          {loginError && <p className="error-message">{loginError.password}</p>}
          <button className="btn btn-block btn-dark w-100">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
