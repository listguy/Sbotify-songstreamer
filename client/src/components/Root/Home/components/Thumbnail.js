import React, { useCallback } from "react";
import { goToPage } from "./wrapper";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const { data, type, rank } = props;

  if (data) {
    data.media =
      type === "song"
        ? `https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`
        : data.media;
  }
  // const goToPage = useCallback((type, id) =>
  //   window.location.assign(
  //     `${window.location.protocol}//${window.location.host}/watch/${type}/${id}`
  //   )
  // );
  return data ? (
    <div className="thumbnail">
      <h3 className="rank">{rank}</h3>
      <img
        src={data.media}
        onClick={() => goToPage(type, data[`${type}_id`])}
      />
      {/* <a href={`//localhost:3000/watch${type}/${data[`${type}_id`]}w`}>
      </a> */}
      <span className="title">{data.title}</span>
      {type === "artist" ? null : <span>{data.artist_name}</span>}
      {type === "song" ? <span>{data.album_name}</span> : null}
    </div>
  ) : null;
}
