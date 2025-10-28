import React from "react";

export function HeaderButton({ label, onClick, extraClasses = "" }) {
  return (
    <div className={`p-0 m-0`}>
      <button
        className={`relative font-[Audiowide,sans-serif] overflow-hidden rounded-3xl cursor-pointer w-max max-lg:w-full px-4 md:px-8 py-2 group will-change-transform
        lg:text-lg md:text-base max-md:w-full mouse-hover:scale-[.9] 
        ${
          label.toLowerCase() === "rockets"
            ? `
            bg-[radial-gradient(50%_50%_at_50%_50%,rgba(108,221,255,0)_0%,rgba(65,133,153,0.2)_100%)] 
            shadow-[inset_0_0_5px_rgba(108,221,255,0.75),inset_0_0_10px_rgba(108,221,255,0.25)] 
            drop-shadow-[0_0_4px_rgba(108,221,255,0.75)] 
            text-[#E5FCFF] 
            text-shadow-[0_0_5px_rgba(0,121,255,.25)] mouse-hover:text-shadow-[0_0_5px_rgba(0,121,255,.1)] mouse-hover:shadow-[inset_0_0_15px_rgba(108,221,255,0.75),inset_0_0_35px_rgba(108,221,255,0.15)]
            uppercase
            `
            : "mouse-hover:text-[#E5FCFF] mouse-hover:text-shadow-[0_0_5px_rgba(0,121,255,.5)] mouse-hover:bg-white/25"
        } 
         ${extraClasses}
        
        `}
        onClick={onClick}
      >
        <span className="">{label}</span>
      </button>
    </div>
  );
}

export default function SimpleButton({ label, onClick, extraClasses = "" }) {
  return (
    <button
      className={`relative font-[Audiowide,sans-serif] overflow-hidden rounded-3xl cursor-pointer w-max max-lg:w-full px-4 md:px-8 py-2 group will-change-transform
        lg:text-lg md:text-base max-md:w-full mouse-hover:scale-[.9] mouse-hover:text-[#E5FCFF] mouse-hover:text-shadow-[0_0_5px_rgba(0,121,255,.5)] mouse-hover:bg-white/25 ${extraClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
