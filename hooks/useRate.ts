import { useState, useEffect } from "react";
import axios from "axios";

import { API_KEY, BASE_URL } from "../constants";

const useFetchAll = (movieId: number) => {
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{} | null>(null);

  useEffect(() => {
    const request = async () => {
      if (userRating !== 0) {
        setIsLoading(true);
        try {
          const session = await axios.get(
            `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
          );
          const sessionId = session.data.guest_session_id;
          await axios.post(
            `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${sessionId}`,
            { value: userRating }
          );
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
