import React from "react";

export default function AlbumPage(props) {
  const { data } = props;
  return (
    <div id="grid">
      <div id="details">
        <span id="type">{data.type}</span>
        <h1>{data.title}</h1>
        {data.type === "album" ? <h2>By: {data.artist_name}</h2> : null}
      </div>
      <div id="cover">
        <img src={data.media} />
      </div>
    </div>
  );
}
