import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Protected from './pages/Protected';
import Register from './pages/Register';

import axios from "axios";
import "./App.css";

export const Content = React.createContext();


const App = () => {
  //user validation starts
  const [counterfeit, setCounterfeit] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    async function validateUser() {
      let counterfeit = await axios.post("/auth/validate", {
        token: user.token,
        email: user.email,
      });
      if (counterfeit.data.counterfeit) {
        setCounterfeit(true)
      }
    }
    if (user) {
      if (user.token) {
        validateUser();
      } else {
        setCounterfeit(true)
      }
    } else {
      setCounterfeit(true)
    }
  }, [navigate]);
  //user validation ends
  //state starts
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const [registerError, setRegisterError] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState({
    email: "",
    password: ""
  });
  //state ends
  const handleChange = (e) => {
    setUserRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const loginHandleChange = (e) => {
    setUserLogin(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  //register user
  const register = async (e) => {
    e.preventDefault()
    try {
      let registerUser = await axios.post("/auth/register", userRegister);
      if (registerUser.data.registered) {
        setRegisterError({
          name: '',
          email: '',
          password: ''
        })
        setUserRegister({
          name: '',
          email: '',
          password: ''
        });

        navigate("/login");
      } else {
        let data = registerUser.data;
        setRegisterError(data);
      }
    } catch (error) {

    }
  }
  //login user
  const login = async (e) => {
    e.preventDefault();
    try {
      let loginUser = await axios.post('/auth/login', userLogin);
      if (loginUser.data.loggedIn) {
        setLoginError({
          email: '',
          password: ''
        })
        setUserLogin({
          email: '',
          password: ''
        })
        localStorage.setItem("user", JSON.stringify(loginUser.data));
        setCounterfeit(false);
        navigate("/protected");
      } else {
        setLoginError(loginUser.data)
      }
    } catch (error) {

    }
  }
  //functions ends
  return (
    <Content.Provider value={{ counterfeit }}>
      <Navbar loggedIn={user && user.loggedIn} counterfeit={counterfeit} setCounterfeit={setCounterfeit} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Register handleChange={handleChange}
              userRegister={userRegister}
              register={register}
              registerError={registerError}
              loggedIn={user && user.loggedIn}
              counterfeit={counterfeit}
            />
          }
        />
        <Route path="/login" element=
          {
            <Login
              loggedIn={user && user.loggedIn}
              counterfeit={counterfeit}
              loginHandleChange={loginHandleChange}
              loginError={loginError}
              userLogin={userLogin}
              login={login}
            />
          }
        />
        <Route path="/protected" element={<Protected />} />
        <Route element={<NotFound />} />
      </Routes>
    </Content.Provider>
  )
}

export default App