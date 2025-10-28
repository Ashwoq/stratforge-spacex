import { useState } from "react";
import logo from "/logoText.svg";
import { HeaderButton } from "../components/Button.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const MenuIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const XIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const sections = ["History", "Launches", "Rockets"];

  return (
    <div id="startAOS">
      {/* Blur start */}
      <div
        className={`fixed inset-0 z-900 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-500 ease-in-out ${
          isOpen
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
        onClick={() => setIsOpen(true)}
      />
      {/* Blur end */}

      <div
        className={`z-999 max-md:bg-black/40 bg-black/40 backdrop-blur-md max-md:w-[96%] max-md:translate-x-[2%] max-md:backdrop-blur-lg md:w-full max-md:rounded-4xl max-md:bottom-2 fixed overflow-hidden`}
        {...(window.innerWidth > 640 && {
          "data-aos": "fade-down",
          "data-aos-anchor": "#startAOS",
          "data-aos-delay": "1300",
          "data-aos-duration": "1200",
        })}
        {...(window.innerWidth < 640 && {
          "data-aos": "fade-up",
          "data-aos-anchor": "#startAOS",
          "data-aos-delay": "2200",
          "data-aos-duration": "1100",
        })}
      >
        <div className="flex items-center justify-between p-3 md:p-4 lg:px-5 max-md:flex-col max-md:gap-4">
          <div className="flex items-center justify-between max-md:w-full md:justify-start">
            <button
              className={`relative flex items-center justify-center text-white rounded-full md:hidden w-9 h-9 ${
                isOpen ? "bg-sky-500/25" : "bg-red-500/50"
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon
                className={`absolute transition-all duration-200 ease-in-out ${
                  !isOpen
                    ? "opacity-0 scale-0 rotate-180"
                    : "opacity-100 scale-75"
                }`}
              />
              <XIcon
                className={`absolute transition-all duration-200 ease-in-out ${
                  !isOpen
                    ? "opacity-100 -rotate-180 scale-75"
                    : "opacity-0 scale-0"
                }`}
              />
            </button>

            <img
              src={logo}
              alt={"SpaceX"}
              className="object-contain w-40 max-md:-mt-1 max-md:ml-6 transition-opacity p-0.5 duration-400 ease-in-out cursor-pointer mouse-hover:opacity-50 will-change-transform lg:w-3xs md:w-60"
              onClick={() => {
                setIsOpen(true);
                navigate("/");
              }}
            />
            <MenuIcon className="scale-75 opacity-0 w-9 h-9 bg-neutral-200 md:hidden" />
          </div>
          <div
            className={`flex max-md:flex-col w-full md:gap-5 lg:gap-12 md:w-max justify-between overflow-hidden items-center max-md:rounded-3xl max-md:bg-linear-to-br max-md:from-neutral-800/80 max-md:via-neutral-900/70 max-md:to-neutral-950/80 max-md:gap-4 transition-all ease-in-out ${
              isOpen
                ? "max-md:max-h-0 max-md:opacity-50 duration-600 max-md:pointer-events-none max-md:-mt-4"
                : "max-md:max-h-screen duration-500 max-md:py-5"
            }`}
          >
            {sections.map((item, index) => {
              const path = `/${item.toLowerCase()}`;
              const isActive = location.pathname === path;
              return (
                <div
                  key={index}
                  className={`max-md:w-[75%] ${
                    isOpen ? "max-md:opacity-0" : "max-md:opcaity-100"
                  } transition-opacity duration-400 ease-in-out`}
                >
                  <HeaderButton
                    label={item}
                    extraClasses={`
                      ${
                        isActive
                          ? "text-shadow-[0_0_20px_rgba(0,121,255,1),0_0_5px_rgba(0,121,255,1)]"
                          : ""
                      }     `}
                    onClick={() => {
                      setIsOpen(true);
                      navigate(path);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
