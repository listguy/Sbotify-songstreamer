import React from "react";
import "../styles/SongPage.css";

export default function SongsPage(props) {
  const { data } = props;

  console.log(data);
  return (
    <div id="grid">
      <div id="details">
        <h1>{data.title}</h1>
        <h2>Album: {data.album_name}</h2>
        <h2>By: {data.artist_name}</h2>
      </div>
      <div id="video">
        <iframe src={data.media.replace("watch?v=", "embed/")} />
      </div>
    </div>
  );
}
