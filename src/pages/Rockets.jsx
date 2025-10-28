import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Loader from "../components/Loader.jsx";
import { useFetch } from "../api/useFetch.jsx";

const Rockets = () => {
  const navigate = useNavigate();
  const URL_NEXT_LAUNCH = "rockets";
  const [rocketID, setRocketID] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const {
    data: rocketData,
    loading: loading,
    error: error,
    refetch: refetch,
  } = useFetch(URL_NEXT_LAUNCH);

  if (error) {
    return <Error error={error} onRetry={refetch} />;
  }

  return (
    <>
      <Loader loading={loading} />

      <div className="xl:px-16 2xl:px-32 min-h-screen md:p-8 max-sm:pt-9 max-md:pb-24 xl:py-14 px-6 relative overflow-hidden bg-subpage">
        <div className="md:pt-16 md:pb-8 mx-auto w-max text-2xl md:text-5xl font-semibold text-color-subPage">
          SpaceX Rockets
        </div>
        <div className="mb-8 mt-5">
          <div className="flex mb-5 max-md:flex-col justify-between max-md:gap-3 md:items-center">
            <div className="border-l-4 pl-4 w-max text-xl md:text-2xl lg:text-3xl font-medium text-color-subPage rounded">
              Quick Preview
            </div>
            <div
              className={`relative max-md:w-full flex items-center overflow-hidden bg-white border-2 rounded-lg border-lightBlue w-max transition-all duration-300 ease-in-out `}
            >
              <input
                type="text"
                placeholder="Search Rocket by its ID"
                className={`p-2 md:text-lg focus:outline-none min-w-full md:pl-3 md:pr-28 pr-24 md:min-w-md font-semibold text-black`}
                required
                value={rocketID}
                onChange={(e) => {
                  setRocketID(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate(`/rocketDetails/${rocketID.trim()}`);
                  }
                }}
              />

              <button
                className={`px-4 py-1 absolute text-white rounded-md transition-all! font-medium duration-300 ease-in-out transform will-change-transform bg-lightBlue ${
                  rocketID
                    ? "scale-100 opacity-100 hover:scale-110 right-2 mouse-hover:bg-primaryBlue "
                    : "scale-50 opacity-0 pointer-events-none w-0 -right-20"
                } `}
                onClick={() => navigate(`/rocketDetails/${rocketID.trim()}`)}
              >
                Search
              </button>
            </div>
          </div>

          <img
            src="./logo.svg"
            alt="bg image"
            className="absolute left-[-10%] bottom-[8%] w-full scale-125 opacity-6 pointer-events-none"
          />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xl:gap-12 gap-28 md:gap-x-12 md:gap-y-44">
            {rocketData?.map((item, index) => {
              const companyData = [
                {
                  label: "Status",
                  value: item?.active ? "Active" : "Inactive",
                },
                { label: "Type", value: item?.type },
                { label: "Stages", value: "Stages " + item?.stages },
              ];

              return (
                <div
                  key={index}
                  className="flex gap-3 cursor-default min-h-[135%] md:min-h-[180%] relative overflow-hidden flex-col group rounded-3xl py-3 px-5 bg-black"
                >
                  <div className=" overflow-hidden h-full w-full z-0 pointer-events-none -bottom-1 absolute inset-0">
                    {imageLoading && (
                      <div className="absolute translate-y-[-25%] inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                      </div>
                    )}

                    <img
                      src={item?.flickr_images[0] ?? "./logo.svg"}
                      alt="rocket image"
                      onLoad={() => setImageLoading(false)}
                      className="w-full group-mouse-hover:scale-120 transition-transform duration-400 ease-in-out scale-110 h-full  object-cover  "
                    />
                  </div>

                  <div className="w-full rounded-3xl h-full inset-0 pointer-events-none absolute z-1 bg-linear-to-b from-25% to-70% from-transparent to-black/95  group-mouse-hover:shadow-[inset_0px_0px_20px_rgba(102,189,255,0.75)] transition-shadow duration-400 ease-in-out shadow-[inset_-2px_-1px_7px_rgba(102,189,255,0.4)]" />
                  <div className="flex items-center mt-auto justify-between ">
                    <div className="w-max z-2 max-sm:text-xl font-medium line-clamp-1 text-2xl transition-colors duration-300 ease-in-out group-mouse-hover:text-white/50">
                      {item?.name}
                    </div>
                    <Link
                      className="cursor-pointer max-sm:text-sm mouse-hover:scale-95 mouse-hover:bg-white/20 group-mouse-hover:bg-white/30 transition-[transform, color] duration-300 ease-in-out bg-white/10 backdrop-blur-sm  will-change-transform z-2 w-max px-4 py-0.5 rounded-full border group-mouse-hover:scale-105"
                      to={`/rocketDetails/${item?.id}`}
                    >
                      Explore
                    </Link>
                  </div>
                  <div className="z-2 text-white/80 group-mouse-hover:text-white/50 transition-colors duration-300 ease-in-out line-clamp-3  text-sm">
                    {item?.description}
                  </div>
                  <div className="font-medium w-full z-2 flex justify-between">
                    {companyData.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between bg-white/15 group-mouse-hover:opacity-70 transition-opacity duration-400 ease-in-out rounded-full py-1 px-4
                        `}
                      >
                        <p className="capitalize text-xs">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rockets;
