import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home.jsx";
import Header from "./pages/Header.jsx";
import History from "./pages/History.jsx";
import Rockets from "./pages/Rockets.jsx";
import Error from "./components/Error.jsx";
import Launches from "./pages/Launches.jsx";
import Loader from "./components/Loader.jsx";
import RocketDetails from "./pages/RocketDetails.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const aosLoaded = sessionStorage.getItem("aosLoaded");

    if (!aosLoaded) {
      AOS.init({
        easing: "ease-in-out",
        once: true,
      });
      window.scrollTo({ top: 0, behavior: "auto" });
      sessionStorage.setItem("aosLoaded", "true");
    } else {
      const style = document.createElement("style");
      style.innerHTML = `
        [data-aos] {
          opacity: 1 !important;
          transform: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (loading) return <Loader loading={loading} />;

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/rocketDetails/:id" element={<RocketDetails />} />
          <Route
            path="*"
            element={
              <Error
                error={true}
                errorMessage={"Page Not Found"}
                errorCode={404}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
