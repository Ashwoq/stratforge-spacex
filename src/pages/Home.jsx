import React, { useEffect } from "react";
import str from "../assets/SVG/str.svg";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useFetch } from "../api/useFetch";
import mission from "../assets/SVG/mission.svg";
import rocket from "../assets/Images/bgRocket.webp";
import dummyRocket from "../assets/Images/dummyRocket.png";

const Hom1 = () => {
  const URL_COMPANY_INFO = "company";
  const URL_NEXT_LAUNCH = "launches/next";

  const {
    data: nextLaunch,
    loading: loadingNext,
    error: errorNext,
    refetch: refetchNext,
  } = useFetch(URL_NEXT_LAUNCH);

  const {
    data: companyInfo,
    loading: loadingCompany,
    error: errorCompany,
    refetch: refetchCompany,
  } = useFetch(URL_COMPANY_INFO);

  useEffect(() => {
    if (window.innerWidth > 768) return;

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);

    const lhs = document.querySelector(".lhs");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const opacity = Math.max(0, 1 - scrollTop / 400);

      const scale = Math.max(0.925, 1 - scrollTop / 3000);

      lhs.style.opacity = opacity;
      lhs.style.transform = `scale(${scale})`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return { formattedDate, formattedTime };
  };

  const formatValuation = (valuation) => {
    if (isNaN(valuation) || valuation === null || valuation === undefined) {
      return valuation;
    }

    let formattedValuation = "";

    if (valuation >= 1_000_000_000) {
      formattedValuation = (valuation / 1_000_000_000).toFixed(1) + " B";
    } else if (valuation >= 1_000_000) {
      formattedValuation = (valuation / 1_000_000).toFixed(1) + " M";
    } else {
      formattedValuation = Number(valuation).toLocaleString();
    }

    return `$${formattedValuation}`;
  };

  const companyData = [
    { label: "Valuation", value: formatValuation(companyInfo?.valuation) },
    { label: "Employees", value: companyInfo?.employees },
    { label: "Vehicles", value: companyInfo?.vehicles },
  ];

  const nextLaunchData = {
    main: [
      { label: "Mission Name", value: nextLaunch?.name },
      { label: "Cores", value: nextLaunch?.cores.length },
      {
        label: "Launch Date",
        value: formatDate(nextLaunch?.date_utc).formattedDate,
      },
      {
        label: "Launch Time",
        value: formatDate(nextLaunch?.date_utc).formattedTime + "(Local)",
      },
    ],
    end: [
      {
        label: "Live Link",
        value: (
          <a
            href={nextLaunch?.links.webcast}
            title="YouTube link"
            className="mouse-hover:text-blue-600 transform-colors underline ease-in-out duration-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>
        ),
      },
      { label: "Mission Status", value: "Upcoming" },
      { label: "Flight Number", value: nextLaunch?.flight_number },
    ],
  };

  if (errorNext || errorCompany) {
    return (
      <Error
        error={errorNext || errorCompany}
        onRetry={errorNext ? refetchNext : refetchCompany}
      />
    );
  }

  return (
    <>
      <Loader loading={loadingNext || loadingCompany} />
      <div
        id="startAOS"
        className={`bg-black md:h-screen md:overflow-hidden xs:h-[150vh] max-xs:h-[165vh] flex md:justify-between max-md:p-4 max-md:flex-col max-md:gap-20 justify-end max-xl:p-8 p-14 w-screen md:relative 
          `}
      >
        {/* That extra glow */}
        <div
          className="fixed inset-0 bg-masker bg-no-repeat  bg-size-[125%_125%] bg-position-[center_-150%] max-md:bg-size-[225%_125%] max-md:bg-position-[center_-140%] pointer-events-none drop-shadow-[0_0_150px_rgba(136,204,255,0.2),0_0_50px_rgba(82,165,228,.75),0_0_10.4px_rgba(42,170,255,.75)]
         "
          data-aos="fade-up"
          data-aos-anchor="#startAOS"
          data-aos-delay="1200"
          data-aos-duration="1500"
        ></div>

        {/* Main Earth */}
        <div
          className="
          fixed inset-0 min-h-screen bg-earth brightness-115 bg-no-repeat bg-size-[115%_125%] bg-position-[center_-130%] max-md:bg-size-[220%_125%] max-md:bg-position-[center_-145%] bg-mask pointer-events-none"
          data-aos="fade-up"
          data-aos-anchor="#startAOS"
          data-aos-delay="1100"
          data-aos-duration="1500"
        ></div>

        <img
          src={str}
          alt="str"
          className="fixed h-screen pointer-events-none w-screen inset-0 opacity-70"
        />
        <img
          src={mission}
          alt="mission"
          className="fade-in-75 w-[550px] max-md:w-[90vw] top-[50%] translate-y-[-75%] max-md:translate-y-[-155%] max-lg:translate-y-[-140%] fixed left-[50%] translate-x-[-50%] h-auto pointer-events-none "
        />
        <div className="w-[100px] max-xs:w-[85px] top-[50%] translate-y-[-65%] max-md:translate-y-[-90%] max-lg:translate-y-[-105%] max-md:brightness-75 fixed left-[50%] translate-x-[-50%] h-auto drop-shadow-[0px_100px_100px_rgba(36,161,255,0.55)] pointer-events-none">
          <img
            src={rocket}
            alt="rocket"
            data-aos="fade-up"
            data-aos-anchor="#startAOS"
            data-aos-delay="1700"
            data-aos-duration="1300"
          />
        </div>

        {/* LHS Start */}
        <div
          className="flex lhs will-change-transform max-xs:top-[40%] w-[40%] portrait:lg:w-[60%] md:relative max-md:sticky lg:my-auto lg:top-10 xs:top-[50%] max-md:h-100 md:h-max max-md:w-full max-lg:w-[60%] justify-center items-start max-md:gap-4 md:gap-8 flex-col bg-lhsGlow fade-in-75LHS bg-clip-text text-transparent portrait:lg:top-[25%]"
          {...(window.innerWidth > 640 && {
            "data-aos": "fade-right",
            "data-aos-anchor": "#startAOS",
            "data-aos-delay": "2700",
            "data-aos-duration": "1300",
          })}
        >
          <p className="leading-11 max-md:leading-tight max-lg:text-3xl max-md:text-2xl text-4xl max-md:w-[80%] font-semibold">
            {companyInfo?.summary.split(".")[0]}
          </p>
          <div className="font-semibold flex gap-16">
            {companyData.map((item, index) => (
              <div key={index} className="flex flex-col">
                <p className="text-3xl max-lg:text-2xl max-md:text-xl">
                  {item.value}
                </p>
                <p className="text-sm max-md:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* LHS End */}

        {/* RHS Start */}
        <div
          className="flex justify-center portrait:lg:top-[25%] relative lg:my-auto lg:top-10 md:top-[50%] xs:h-120 max-xs:h-90 md:h-max items-end gap-6 flex-col cursor-default lg:w-[32%] xl:w-[23%] max-lg:w-[45%] max-md:w-[95%] max-md:mx-auto"
          {...(window.innerWidth > 640 && {
            "data-aos": "fade-left",
            "data-aos-anchor": "#startAOS",
            "data-aos-delay": "2700",
            "data-aos-duration": "1300",
          })}
        >
          <div className="bg-rhsGlowOuter space-y-1 rounded-2xl p-3 w-full">
            <div className="bg-rhsGlowInner p-2 rounded-xl flex flex-col max-sm:gap-2 gap-3">
              <div className="text-center items-center flex max-sm:gap-2 gap-3 ">
                <p
                  className={`
                  bg-black text-xxs xl:text-sm
                  shadow-[inset_0_0_4px_rgba(108,221,255,0.75),inset_0_0_15px_rgba(108,221,255,0.5)] 
                text-[#E5FCFF] text-shadow-[0_0_5px_rgba(0,121,255,.25)] w-1/3 py-2 lg:py-1 font-medium px-2 rounded-full
                  `}
                >
                  Next Launch
                </p>
                <p className="bgpink-400 text-shadow-[0_0_7px_rgba(0,121,255,.75)] w-2/3 text-lg uppercase font-[Audiowide,sans-serif]">
                  {nextLaunch?.name}
                </p>
              </div>

              <div className="flex gap-3 items-center text-xs">
                <img
                  src={dummyRocket}
                  alt="next launch image"
                  className="object-cover opacity-75 w-1/3 h-24 rounded-2xl "
                />

                <div className=" w-2/3 space-y-1">
                  {nextLaunchData.main.map((item, index) => (
                    <div className="flex justify-between" key={index}>
                      <p>{item.label}</p>
                      <p> {item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-2 pb-0 flex text-center justify-between text-xs">
              {nextLaunchData.end.map((item, index) => (
                <div className="flex flex-col" key={index}>
                  <p>{item.label}</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RHS End */}
      </div>
    </>
  );
};

export default Hom1;
