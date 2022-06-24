import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "../App";

const Protected = () => {
  const navigate = useNavigate();
  const context = useContext(Content);
  useEffect(() => {
    if (context.counterfeit) {
      navigate("/login");
    }
  }, [context, navigate]);
  return <div className="container center">Protected</div>;
};

export default Protected;
