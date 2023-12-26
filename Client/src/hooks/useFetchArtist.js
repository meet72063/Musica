import { useEffect, useState } from "react";
import { getAllArtists } from "../api/user";
import { setAllArtists } from "../Features/CurrentTrack";
import { useDispatch, useSelector } from "react-redux";

const useFetchArtist = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { allArtist } = useSelector((store) => store.currentTrack);

  const dispatch = useDispatch();

  useEffect(() => {
    const getartists = async () => {
      try {
        setLoading(true);
        const Artists = await getAllArtists();
        dispatch(setAllArtists(Artists));
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    //fetch only if  artistlist  is empty
    if (!allArtist.length) {
      getartists();
    }
  }, []);

  return { loading, error, allArtist };
};

export default useFetchArtist;
