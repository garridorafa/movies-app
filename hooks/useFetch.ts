import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "?api_key=572a752b603222159b7f28cfa392076e";

const getMovieDetails = (id: number) => {
  const movieReq = axios.get(
    `https://api.themoviedb.org/3/movie/${id}${apiKey}`
  );
  const castingReq = axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits
${apiKey}`
  );

  return [movieReq, castingReq];
};

const useFetchAll = (id: number) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{} | null>(null);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);

      try {
        const [movieDetails, casting] = await Promise.all(getMovieDetails(id));
        setData({ ...movieDetails.data, ...casting.data });
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
      }
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
