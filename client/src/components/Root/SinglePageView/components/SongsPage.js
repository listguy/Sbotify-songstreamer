import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getFromDB } from "../../Home/components/wrapper";
import "../styles/SongPage.css";

export default function SongsPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;

  useEffect(() => {
    getFromDB(path).then((result) => {
      setData(result);
    });
  }, [path]);

  return data ? (
    <div id="grid">
      <div id="details">
        <h1>{data.title}</h1>
        <Link to={`/watch/album/${data.album_id}`}>
          <h2>Album: {data.album_name}</h2>
        </Link>
        <Link to={`/watch/artist/${data.artist_id}`}>
          <h2>By: {data.artist_name}</h2>
        </Link>
      </div>
      <div id="video">
        <iframe src={data.media.replace("watch?v=", "embed/")} />
      </div>
    </div>
  ) : null;
}
