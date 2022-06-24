import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({
  userRegister,
  handleChange,
  register,
  registerError,
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
      <form className="card w-50 mx-auto mt-5" onSubmit={register}>
        <div className="card-header">
          <h3 className="text-dark">Register User</h3>
        </div>
        <div className="card-body">
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            aria-label="hidden"
            className="form-control mb-2"
            value={userRegister.name}
            onChange={handleChange}
          />
          {registerError.name && (
            <p className="error-message">{registerError.name}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            aria-label="hidden"
            value={userRegister.email}
            onChange={handleChange}
            className="form-control mb-2"
          />
          {registerError.email && (
            <p className="error-message">{registerError.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="enter your password"
            value={userRegister.password}
            onChange={handleChange}
            aria-label="hidden"
            className="form-control mb-2"
          />
          {registerError.password && (
            <p className="error-message">{registerError.password}</p>
          )}

          <button type="submit" className="btn btn-block btn-dark w-100">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
