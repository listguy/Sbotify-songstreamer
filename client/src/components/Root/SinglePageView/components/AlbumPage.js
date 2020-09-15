import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getFromDB } from "../../Home/components/wrapper";

export default function AlbumPage() {
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
        <span id="type">{data.type}</span>
        <h1>{data.title}</h1>
        <Link to={`/watch/artist/${data.artist_id}`}>
          <h2>By: {data.artist_name}</h2>
        </Link>
      </div>
      <div id="cover">
        <img src={data.media} />
      </div>
    </div>
  ) : null;
}
