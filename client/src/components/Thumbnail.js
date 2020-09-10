import React, { useState, useEffect } from "react";
import getFromDB from "./wrapper";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const [details, setDetails] = useState();
  const { data, type, rank } = props;

  useEffect(() => {
    async function getMissingDetails() {
      if (type === "song") {
        await getFromDB(`/song/${data.artist_id}`).then((artist) => {
          data.artis = artist.title;
          delete data.artist_id;
        });
        await getFromDB(`/song/${data.album_id}`).then((album) => {
          data.album = album.title;
          delete data.album_id;
        });
      }
      if (type === "album") {
        await getFromDB(`/album/${data.artist_id}`).then((artist) => {
          data.artis = artist.title;
          delete data.artist_id;
        });
      }
      setDetails(data);
    }
    getMissingDetails();
  }, []);

  return details ? (
    // ? Object.keys(details).map((key) => `${key}: ${details[key]} `)
    <div className="thumbnail">
      <h3 className="rank">{rank}</h3>
      <img src={details.media} />
      <span className="title">{details.title}</span>
    </div>
  ) : null;
}
