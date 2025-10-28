import React from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useFetch } from "../api/useFetch";
import SimpleButton from "../components/Button";

const History = () => {
  const URL = "history";

  const { data: launchData, loading, error } = useFetch(URL);

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
      <div className="xl:px-32 md:p-8 max-sm:pt-9 max-md:pb-24 xl:py-14 px-6 bg-subpage">
        <div className="md:pt-16 md:pb-8 mx-auto w-max text-2xl md:text-5xl font-semibold text-color-subPage">
          SpaceX History Timeline
        </div>
        <div className="mb-8 mt-5">
          <div
            className="border-l-4 mb-5 pl-4 w-max text-xl md:text-2xl lg:text-3xl font-medium text-color-subPage border-l-sky-500 
        rounded"
          >
            Quick Preview
          </div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 xl:gap-16 gap-8 md:gap-12">
            {launchData?.map((item, index) => (
              <div
                className="flex gap-2 flex-col justify-between bg-uniformGlowLight rounded-2xl p-2"
                key={index}
              >
                <div className="flex flex-col bg-rhsGlowInner py-2 px-3 rounded-xl gap-2 h-full w-full">
                  <a
                    className="font-medium leading-tight underline transition-colors duration-300 ease-in-out decoration-transparent line-clamp-1 hover:decoration-white md:text-xl md:leading-7"
                    title="Article link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.links.article}
                  >
                    {item?.title}
                  </a>
                  <div className="text-sm font-normal line-clamp-3 md:text-base">
                    <p>{item?.details}</p>
                  </div>
                </div>

                <div className="flex justify-evenly items-center">
                  <div className="text-sm font-light">
                    {formatDate(item?.event_date_utc).formattedDate}
                  </div>
                  <a
                    href={item?.links.article}
                    title="Article link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-base font-semibold text-blue-300 underline transition-colors duration-300 ease-in-out cursor-pointer mouse-hover:text-blue-500 w-max"
                  >
                    Article
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
