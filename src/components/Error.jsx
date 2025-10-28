import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "./Button";

const Error = ({ error, onRetry, errorMessage = null, errorCode = null }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed gap-4 inset-0 z-50 bg-black flex flex-col justify-center items-center text-white text-xl
        transition-opacity duration-1000 ease-in-out ${
          error
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <h1 className="text-7xl max-md:text-5xl font-bold text-red-600">
        {errorCode ?? "ERROR"}
      </h1>

      <p className="text-5xl mb-2 font-semibold max-md:text-lg max-md:max-w-[80%] text-center">
        {errorMessage ?? "Something went wrong. Please try again later."}
      </p>
      <div className="flex gap-5">
        <Button
          label={"Back"}
          onClick={() => navigate(-1)}
          extraClasses="bg-white/40 text-shadow-none text-lg uppercase   max-md:w-max max-md:px-10"
        />
        <Button
          label={"retry"}
          onClick={onRetry}
          extraClasses="bg-white/40 text-shadow-none text-lg uppercase   max-md:w-max max-md:px-10"
        />
      </div>
    </div>
  );
};

export default Error;
