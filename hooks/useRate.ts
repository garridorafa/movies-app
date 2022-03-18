import { useState, useEffect } from "react";
import axios from "axios";

import { API_KEY, BASE_URL, SESSION_ID } from "../constants";

const useFetchAll = (movieId: number) => {
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{} | null>(null);

  useEffect(() => {
    const request = async () => {
      if (userRating !== 0) {
        setIsLoading(true);
        try {
          const resp = await axios.post(
            `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            { value: userRating }
          );

          console.log(resp);
        } catch (err: any) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    request();
  }, [userRating]);

  return {
    userRating,
    setUserRating,
    error,
    isLoading,
  };
};

export default useFetchAll;
