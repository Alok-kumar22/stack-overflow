import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { signup, login } from "../../actions/auth";
const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (!isSignup) {
        if (!name) {
          alert("Name is required");
        }
        if (!email) {
          alert("email is required");
        }
        if (!password) {
          alert("Password is required");
        }

        dispatch(signup({ name, email, password }, navigate));
      } else {
        dispatch(login({ email, password }, navigate));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="auth-section">
      <div className="auth-container-2">
        <form onSubmit={handleSubmit}>
          {!isSignup && (
            <laber>
              <h4>Display Name</h4>
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </laber>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forget Password?
                </p>
              )}
            </div>
            <input
              type="password"
              value={password}
              name="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label>
            <br />
            <button type="submit" className="auth-btn">
              {isSignup ? "Log In" : "Sign Up"}
            </button>
          </label>
        </form>
      </div>

      <button
        type="button"
        className="handle-switch-btn"
        onClick={handleSwitch}
      >
        {!isSignup ? "Log In" : "Sign Up"}
      </button>
    </section>
  );
};

export default Auth;
