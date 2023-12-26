import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllSongs } from "../Features/CurrentTrack";
import { getAllSongs } from "../api/user";

const useFetchAllSongs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { allSongs } = useSelector((store) => store.currentTrack);

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const gettingsongs = async () => {
      try {
        setLoading(true);
        const { songs } = await getAllSongs(signal);
        dispatch(setAllSongs(songs));
      } catch (error) {
        if (error.name !== "AbortError") setError(error);
      } finally {
        setLoading(false);
      }
    };
    //fetch songs only if allSongs playlist is empty
    if (!allSongs.length) {
      gettingsongs();
    }
    return () => {
      abortController.abort();
    };
  }, []);

  return { loading, error, allSongs };
};

export default useFetchAllSongs;
