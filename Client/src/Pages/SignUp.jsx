import React from "react";
import Input from '../Components/SignUp/Input'


const SignUp = () => {
  return (
    <div className=" h-screen  sm:h-full xl:h-full  max-w-full bg-[rgba(22,22,22)] pb-40">
     
      <div className="  w-full  pt-5 ">
        <div className="  grid place-content-center     ">
          <div className=" flex flex-col  text-white p-5 sm:p-10    bg-black  rounded items-center  ">
            <h1 className=" flex  font-bold text-3xl   mb-10 p-2 ">Sign Up to Musica</h1>

            <div>
              <Input />
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default SignUp;
