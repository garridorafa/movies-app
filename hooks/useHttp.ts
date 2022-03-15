import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";

const apiKey = "?api_key=572a752b603222159b7f28cfa392076e";

const useHttp = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      await axios
        .get(baseUrl + url + apiKey)
        .then((response: any) => {
          setData(response.data.results);
          setIsLoading(false);
        })
        .catch((err: any) => {
          setError(err);
        });
    };
    request();
  }, []);

  return {
    data,
    error,
    isLoading,
  };
};

export default useHttp;
