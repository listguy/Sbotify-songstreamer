import React, { useEffect, useState } from "react";
import { getFromDB } from "../Home/components/wrapper";
import AlbumPage from "./components/AlbumPage";
import SongsPage from "./components/SongsPage";

export default function SinglePageView() {
  const [data, setData] = useState();
  const displays = {
    song: <SongsPage data={data} />,
    album: <AlbumPage data={data} />,
    artist: <AlbumPage data={data} />,
  };
  const type = window.location.pathname.substring(6).match(/\w+/)[0];

  useEffect(() => {
    const path = window.location.pathname;

    getFromDB(path).then((result) => {
      result.type = type;
      console.log(result);
      setData(result);
    });
  }, []);

  return data ? displays[type] : <h1>{data}</h1>;
}
