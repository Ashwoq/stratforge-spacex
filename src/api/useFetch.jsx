import axios from "axios";
import { useState, useEffect } from "react";

export function useFetch(url, method = "GET", body = null, immediate = true) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const BASE_URL = "https://api.spacexdata.com/v4/";

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const options = {
        method,
        url: BASE_URL + url,
        data: body,
      };
      const response = await axios(options);
      setData(response.data);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // console.log(data);

  useEffect(() => {
    if (immediate && url) fetchData();
  }, [url, method, body]);

  return { data, loading, error, refetch: fetchData };
}
