import React from "react";
import { Link } from "react-router-dom";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const { data, type, rank } = props;

  if (data) {
    debugger;
    data.media =
      type === "song"
        ? `https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`
        : data.media;
  }

  return data ? (
    <div className="thumbnail">
      <h3 className="rank">{rank}</h3>
      <Link to={`/watch/${type}/${data[`${type}_id`]}`}>
        <img src={data.media} />
      </Link>
      <span className="title">{data.title}</span>
      {type === "artist" ? null : <span>{data.artist_name}</span>}
      {type === "song" ? <span>{data.album_name}</span> : null}
    </div>
  ) : null;
}
