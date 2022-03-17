import { useState, useEffect } from "react";
import axios from "axios";

import { API_KEY, BASE_URL } from "../constants";

const useFetchAll = (urlBody: string) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{} | null>(null);

  const url = `${BASE_URL}/${urlBody}?api_key=${API_KEY}`;

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
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
