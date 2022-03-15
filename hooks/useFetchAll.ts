import { useState, useEffect } from "react";
import axios from "axios";

import { IMovie } from "../types/movie";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "?api_key=572a752b603222159b7f28cfa392076e";

const useFetchAll = (url: string) => {
  const [data, setData] = useState<IMovie[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{} | null>(null);

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

export default useFetchAll;
