import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Store/authSlice";
import { Input } from "./index";
import { useForm } from "react-hook-form";
import { Loader } from "./index";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [process, setProcess] = useState(true);

  const CreateAccount = async (data) => {
    setError("");
    try {
      setProcess(false);
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) Dispatch(login({ user }));
      }

      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return !process ? (
    <Loader />
  ) : (
    <div className="SignUp">
      <h1>Create Account</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(CreateAccount)}>
        <Input
          // lable='Name : '
          type="text"
          placeholder="Enter your name"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          type="email"
          // label="Email :"
          placeholder="Email Address"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ||
                "Enter a valid email address",
            },
          })}
        />
        <Input
          type="password"
          // label='Password :'
          placeholder="Enter your password "
          {...register("password", {
            required: true,
          })}
        />
        <button className="SignUpBtn" type="submit">
          Submit
        </button>
      </form>
      <Link to={"/login"}>
        <h3> Already have an account?&nbsp; Login!</h3>
      </Link>
    </div>
  );
}

export default Signup;
