import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";
import Error from "../components/Error.jsx";
import Loader from "../components/Loader.jsx";
import { useFetch } from "../api/useFetch.jsx";
import SimpleButton from "../components/Button.jsx";

const RocketDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const URL_NEXT_LAUNCH = `rockets/${params.id}`;
  const {
    data: rocketData,
    loading: loading,
    error: errorStatus,
    refetch: refetch,
  } = useFetch(URL_NEXT_LAUNCH);

  const generalDetails = [
    {
      name: rocketData?.name,
      type: rocketData?.type,
      active: rocketData?.active,
      stages: rocketData?.stages,
      boosters: rocketData?.boosters,
      cost_per_launch: rocketData?.cost_per_launch,
      success_rate_pct: rocketData?.success_rate_pct,
      first_flight: rocketData?.first_flight,
      country: rocketData?.country,
      company: rocketData?.company,
      wikipedia: rocketData?.wikipedia,
      description: rocketData?.description,
      id: rocketData?.id,
    },
  ];

  const imageData = [{ flickr_images: rocketData?.flickr_images }];

  const measuments = [
    {
      title: "height",
      values: {
        meters: rocketData?.height?.meters,
        feet: rocketData?.height?.feet,
      },
    },
    {
      title: "mass",
      values: {
        kg: rocketData?.mass?.kg,
        lb: rocketData?.mass?.lb,
      },
    },
    {
      title: "diameter",
      values: {
        meters: rocketData?.diameter?.meters,
        feet: rocketData?.diameter?.feet,
      },
    },
  ];

  const engines = [
    {
      title: "engine general",
      value: {
        number: rocketData?.engines?.number,
        type: rocketData?.engines?.type,
        version: rocketData?.engines?.version,
        layout: rocketData?.engines?.layout,
        engine_loss_max: rocketData?.engines?.engine_loss_max,
        propellant_1: rocketData?.engines?.propellant_1,
        propellant_2: rocketData?.engines?.propellant_2,
        thrust_to_weight: rocketData?.engines?.thrust_to_weight,
      },
    },
    {
      title: "isp (engine)",
      value: {
        sea_level: rocketData?.engines?.isp?.sea_level,
        vacuum: rocketData?.engines?.isp?.vacuum,
      },
    },
    {
      title: "thrust_sea_level (engine)",
      value: {
        kN: rocketData?.engines?.thrust_sea_level?.kN,
        lbf: rocketData?.engines?.thrust_sea_level?.lbf,
      },
    },
    {
      title: "thrust_vacuum (engine)",
      value: {
        kN: rocketData?.engines?.thrust_vacuum?.kN,
        lbf: rocketData?.engines?.thrust_vacuum?.lbf,
      },
    },
  ];

  if (errorStatus) {
    return (
      <Error
        error={errorStatus}
        errorMessage={"Invalid Rocket ID"}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <Loader loading={loading} />

      <div className="bg-subpage xl:px-16 2xl:px-32 md:p-8 max-sm:pt-9 max-md:pb-24 xl:py-24 px-6 min-h-screen overflow-hidden">
        <div className="bg-lightBlue/10 shadow-[inset_0px_-1px_10px_rgba(102,189,255,0.75)] max-xl:gap-16 gap-10 flex-col flex px-4 py-10 md:py-12 md:px-10 rounded-4xl md:rounded-5xl mx-auto ">
          <div className="flex flex-row-reverse justify-between">
            <div className="mx-auto -translate-x-7 w-max text-2xl md:text-5xl font-semibold text-color-subPage font-[Audiowide,sans-serif]">
              {rocketData?.name ?? "SpaceX Rocket Information"}
            </div>
            <SimpleButton
              label={"← Back"}
              onClick={() => navigate(-1)}
              extraClasses="bg-white/10"
            />
          </div>
          <div className="">
            <div className=" space-y-10">
              {/*  */}
              <div className="overflow-hidden border border-gray-200 rounded-3xl md:rounded-4xl">
                <h2 className="border-b border-gray-200 p-3 md:p-6  text-gray-100  capitalize">
                  General Details
                </h2>
                <div className="p-3 md:p-6 md:text-xl xl:text-lg text-gray-500 max-md:font-medium flex gap-2">
                  <div className="w-full ">
                    {!loading && (
                      <img
                        src={imageData[0].flickr_images[0] ?? "./logo.svg"}
                        alt="rocket image"
                        className="h-[50%] object-cover rounded-3xl w-full"
                      />
                    )}{" "}
                  </div>
                  <div className="md:text-xl xl:text-lg text-gray-300 max-md:font-medium flex flex-col gap-2">
                    {!loading &&
                      Object.entries(generalDetails[0]).map(([x, y], i) => (
                        <ol
                          className="flex justify-between bg-gray-800/40 rounded-xl px-4 py-2 border border-gray-700"
                          key={i}
                        >
                          <li className="capitalize w-[50%] text-gray-400">
                            {x.replaceAll("_", " ")}
                          </li>
                          <li className="text-gray-100 w-full">
                            {typeof y === "boolean"
                              ? y
                                ? "Yes"
                                : "No"
                              : y != null
                              ? y.toString()
                              : "Not Available"}
                          </li>
                        </ol>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="grid gap-6 md:grid-cols-3">
                {!loading &&
                  measuments.map((item, i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-gray-200 rounded-3xl"
                    >
                      <h2 className="border-b border-gray-200 p-3 md:p-6  text-gray-100  capitalize">
                        {item.title}
                      </h2>

                      <div className="p-3 md:p-6 md:text-xl xl:text-lg text-gray-300 max-md:font-medium flex flex-col gap-2">
                        {Object.entries(item.values).map(([x, y], j) => (
                          <ol
                            key={j}
                            className="flex justify-between bg-gray-800/40 rounded-xl px-4 py-2 border border-gray-700"
                          >
                            <li className="capitalize text-gray-400">{x}</li>
                            <li className="text-gray-100">
                              {y ?? "Not Available"}
                            </li>
                          </ol>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              {/*  */}
              <div className="">
                {!loading && rocketData?.payload_weights && (
                  <div className="overflow-hidden border border-gray-200 rounded-3xl  ">
                    <h2 className="border-b border-gray-200 p-3 md:p-6  text-gray-100  capitalize">
                      Payload Weights
                    </h2>

                    <div className="p-3 md:p-6 md:text-xl xl:text-lg text-gray-300 max-md:font-medium grid gap-6 md:grid-cols-4">
                      {rocketData.payload_weights.map((orbit, j) => (
                        <div
                          key={j}
                          className="flex flex-col gap-2 bg-gray-800/40 rounded-xl p-4 border border-gray-700"
                        >
                          <p className="text-lightBlue text-lg font-medium mb-auto">
                            {orbit.name ?? orbit.id}
                          </p>

                          <ol className="flex justify-between">
                            <li className="capitalize text-gray-400">kg</li>
                            <li className="text-gray-100">
                              {orbit.kg?.toLocaleString() ?? "Not Available"}
                            </li>
                          </ol>
                          <ol className="flex justify-between">
                            <li className="capitalize text-gray-400">lb</li>
                            <li className="text-gray-100">
                              {orbit.lb?.toLocaleString() ?? "Not Available"}
                            </li>
                          </ol>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/*  */}
              <div className="grid gap-6 md:grid-cols-2">
                {!loading &&
                  engines.map((item, i) => (
                    <div
                      key={i}
                      className="overflow-hidden border border-gray-200 rounded-3xl  "
                    >
                      <h2 className="border-b border-gray-200 p-3 md:p-6  text-gray-100  capitalize">
                        {item.title.replaceAll("_", " ")}
                      </h2>

                      <div className="p-3 md:p-6 md:text-xl xl:text-lg text-gray-300 max-md:font-medium flex flex-col gap-2">
                        {Object.entries(item.value).map(([key, val], j) => (
                          <ol
                            key={j}
                            className="flex justify-between bg-gray-800/40 rounded-xl px-4 py-2 border border-gray-700"
                          >
                            <li className="capitalize text-gray-400">
                              {key.replaceAll("_", " ")}
                            </li>
                            <li className="text-gray-100">
                              {val ?? "Not Available"}
                            </li>
                          </ol>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RocketDetails;
