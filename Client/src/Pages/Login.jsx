import React from "react";
import InputLogin from "../Components/SignIn/InputLogin";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className=" h-screen  max-w-screen">
      <div className=" bg-[rgba(22,22,22)] h-full">
        <div className="grid place-content-center p-5 ">
          <div className=" grid  text-white  m-5 bg-black  rounded place-content-center">
            <h1 className=" flex  font-bold text-3xl mt-2 mb-20 ml-0 justify-center">
              Log in to Musica
            </h1>

            <div className="flex justify-center">
              <InputLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
