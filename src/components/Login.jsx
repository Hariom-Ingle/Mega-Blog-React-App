import React, { useState } from "react";
import { Link, useNaviate } from "react-router-dom";
import { Login as authLogin } from "../store/authSLice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNaviate();
  const dispatch = useDispatch();
  const { register, hangleSubmit } = useForm();
  const [error, SetError] = useState("");

  const login = async (data) => {
    SetError(""); //making the error clean

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {}
  };

  return;
  <div className="flex items-center justify-center w-full">
    <div
      className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
    >
      <div className="mb-2 flex justify-center">
        <span className="inline-block w-full max-w-[100px]">
          <Logo width="100%" />
        </span>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Email: "
            placeholder="Enter your email"  // this will  count as a props  in our input.jsx we decleare props 
            type="email"
            {...register("email",  // its a compulsory bcz to spread  bcz  if we use the regestir  at any other place then it will overwrite values 
                                    // here email state that  the this input  we use is for email
            {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>;
}

export default Login;
