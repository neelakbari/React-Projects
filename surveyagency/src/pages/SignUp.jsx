import React, {useState } from "react";
import "../scss/SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const SignUp = () => {
  const navigate = useNavigate();
  const dataBase = JSON.parse(localStorage.getItem("dataBase")) || [];
  const [user, setUser] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event, field) => {
    setUser({
      ...user,
      [field]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // navigate("/login");
    dataBase.push(user);
    localStorage.setItem("dataBase", JSON.stringify(dataBase));
    setUser({
      id: uuidv4(),
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="signup_wrapper">
        <span className="title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              value={user.name}
              onChange={(e) => handleChange(e, "name")}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => handleChange(e, "email")}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => handleChange(e, "password")}
              required
            />
          </div>
          <div className="align_right">
            <span>
              <Link to={"/login"}>
                already a user? login <strong>HERE</strong>
              </Link>
            </span>
          </div>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
