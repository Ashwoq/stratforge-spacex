import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useFetch } from "../api/useFetch";
import SimpleButton from "../components/Button";
import dummyImage from "../assets/Images/dummyRocket.png";

const Launches = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [currntPage, setCurrntPage] = useState(1);

  const URL = "launches/query";
  const URL_METHOD = "POST";
  const URL_BODY = useMemo(
    () => ({
      options: { limit: 8, page: currntPage },
    }),
    [currntPage]
  );

  const { data, loading, error } = useFetch(URL, URL_METHOD, URL_BODY);

  const launchData = data ? data.docs : [];
  const prevPage = data ? data.prevPage : null;
  const nextPage = data ? data.nextPage : null;
  const totalDocs = data ? data.totalDocs : null;
  const totalPages = data ? data.totalPages : null;

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

  if (error) {
    return <Error error={error} />;
  }
  return (
    <>
      <Loader loading={loading} />
      <div className="xl:px-32 md:p-8 max-sm:pt-8 max-md:pb-24 xl:py-14 px-6 bg-subpage">
        <div className="md:pt-16 md:pb-8 mx-auto w-max text-2xl md:text-5xl font-semibold text-color-subPage">
          SpaceX Launch Records
        </div>
        <div className="mb-8 mt-5">
          <div
            className="border-l-4 mb-5 pl-4 w-max text-xl md:text-2xl lg:text-3xl font-medium text-color-subPage border-l-sky-500 
        rounded"
          >
            Quick Preview
          </div>
          <div className="grid lg:grid-cols-2 gap-x-20 xl:gap-x-24 gap-y-12">
            {launchData.map((item, index) => (
              <div
                className="flex gap-4 pb-3 border-b md:gap-8 md:pb-7"
                key={index}
              >
                <div className="flex flex-col gap-2">
                  <div className="relative inline-block max-w-28 min-w-28 md:min-w-40 aspect-square md:max-w-40 bg-uniformGlow rounded-xl">
                    {!imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                      </div>
                    )}

                    <img
                      src={item?.links.patch.large ?? dummyImage}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item?.links.patch.small;
                      }}
                      onLoad={() => setImageLoading(false)}
                      alt={item?.name}
                      className="object-cover drop-shadow-[0_0_12px_rgba(108,221,255,0.35)] p-3 h-full w-full  "
                    />
                  </div>

                  <div className="text-[10px] font-light md:text-sm">
                    {formatDate(item?.date_utc).formattedDate}
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:gap-2 w-full">
                  <div className="flex gap-4 w-full justify-between items-center">
                    <Link
                      className="font-medium leading-tight underline transition-colors duration-300 ease-in-out decoration-transparent  hover:decoration-white md:text-2xl md:leading-7 line-clamp-2 "
                      to={`/rocketDetails/${item?.rocket}`}
                    >
                      {item?.name}
                    </Link>
                    <div
                      className={`${
                        item?.success
                          ? "bg-green-500/40 border-green-500"
                          : "bg-red-500/40 border-red-500"
                      } rounded-full border text-sm max-md:text-xs h-max px-4 w-max ml-auto py-1 font-semibold`}
                    >
                      {item?.success ? "Success" : "Failure"}
                    </div>
                  </div>
                  {item?.details ? (
                    <div className="text-sm line-clamp-4 font-normal md:text-base">
                      <p>{item?.details}</p>
                    </div>
                  ) : (
                    <ol className="text-sm font-normal md:text-base">
                      <li className="">
                        Flight Number : {item?.flight_number}
                      </li>
                      <li className="">Cores : {item?.cores.length}</li>
                      <li className="">
                        Recovered :{" "}
                        {item?.fairings?.recovered ? "Yes" : "Negative"}
                      </li>
                      <li className="">
                        Resued : {item?.fairings?.reused ? "Yes" : "Negative"}
                      </li>
                    </ol>
                  )}
                  <Link
                    to={`/rocketDetails/${item?.rocket}`}
                    className="flex items-center gap-3 mt-auto text-base max-md:text-sm font-semibold text-blue-400 underline transition-colors duration-300 ease-in-out cursor-pointer mouse-hover:text-blue-500 w-max"
                  >
                    View Rocket Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <div className="w-max text-sm md:text-base lg:text-lg font-medium border rounded-lg py-1 px-3 md:px-6">
            {`Docs : ${totalDocs}`}
          </div>

          <div className="flex justify-between gap-2 md:gap-3">
            <SimpleButton
              label="Prev"
              onClick={() => setCurrntPage((prev) => prev - 1)}
              extraClasses={`${
                prevPage ? "bg-white/35" : "opacity-20 pointer-events-none"
              } mouse-hover:text-shadow-none max-md:py-1 max-md:text-sm max-md:px-3`}
            />
            <SimpleButton
              label="Next"
              onClick={() => setCurrntPage((prev) => prev + 1)}
              extraClasses={`${
                nextPage ? "bg-white/35" : "opacity-20 pointer-events-none"
              } mouse-hover:text-shadow-none max-md:py-1 max-md:text-sm max-md:px-3`}
            />
          </div>

          <div className="w-max text-sm md:text-base lg:text-lg font-medium border rounded-lg py-1 px-3 md:px-6">
            {`Page : ${currntPage}/${totalPages}`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Launches;
