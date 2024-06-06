import { useEffect, useState } from "react";
import { baseUrl } from "@/config";

const useGetStory = (id) => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}/stories/${id}`);
        const data = await res.json();
        setStory(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  return { story, loading, error };
};

export default useGetStory;
