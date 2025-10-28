import React from "react";
import logo from "/logoText.svg";

const Loader = ({ loading }) => {
  return (
    <div
      className={`
        fixed inset-0 z-999 bg-black flex gap-5 flex-col justify-center items-center text-white text-xl
        transition-opacity duration-1000 ease-in-out
        ${
          loading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <img src={logo} alt={"SpaceX"} className="object-contain w-52" />

      <div
        className={`w-72 h-3 bg-gray-900 rounded overflow-hidden transition-opacity duration-400 ease-in-out ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-full rounded bg-gray-200 animate-loadingBar"></div>
      </div>
    </div>
  );
};

export default Loader;
