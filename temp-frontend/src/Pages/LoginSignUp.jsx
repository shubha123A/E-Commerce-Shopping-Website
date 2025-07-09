import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

const LoginSignUp = () => {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem("authState");
    return savedState ? savedState : "Sign Up";
  });

  const [formData, setFormData] = useState({
    username: "",
    passowrd: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    localStorage.setItem("authState", state);
  }, [state]);

  const login = async () => {
    console.log("Login function Executed",formData);
    // Handle login logic here
  };

  const signup = async () => {
  console.log("Signup Function Executed", formData);

  try {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ correct
        'Accept': 'application/json',       // ✅ correct
      },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    if (response.ok && responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      console.error("Signup failed:", responseData.errors);
    }
  } catch (err) {
    console.error("Failed to fetch:", err); // ✅ better error handling
  }
};


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <>
              <input
                name='username'
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder='Username'
              />
              <input
                name='email'
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder='Email Address'
              />
              <input
                name='passowrd'
                type='password'
                value={formData.passowrd}
                onChange={changeHandler}
                placeholder='Password'
              />
            </>
          ) : (
            <>
              <input
                name='email'
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder='Email Address'
              />
              <input
                name='passowrd'
                type='password'
                value={formData.passowrd}
                onChange={changeHandler}
                placeholder='Password'
              />
            </>
          )}
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?
            <span onClick={() => setState("Login")}> Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Don't have an account?
            <span onClick={() => setState("Sign Up")}> Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
