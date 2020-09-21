import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaEye } from "react-icons/fa";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const { data, rank } = props;
  let media;
  const type = Object.keys(data)[0].slice(0, -3);

  if (data && data.media !== "") {
    media =
      type === "song"
        ? `https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`
        : data.media;
  }

  return data ? (
    <div
      className="thumbnail"
      style={type === "artist" ? { backgroundColor: "unset" } : null}
    >
      <span className="rank">{rank}</span>
      <div className="thumb-img">
        <div class="overlay-options">
          {type === "song" ? <FaPlay /> : <FaEye />}
        </div>
        <Link to={`/watch/${type}/${data[`${type}_id`]}`}>
          {data.media !== "" && (
            <img
              src={media}
              style={type === "artist" ? { borderRadius: "50%" } : null}
            />
          )}
        </Link>
      </div>
      <>
        <span className="title">{data.title}</span>
        <Link to={`/watch/artist/${data.artist_id}`}>
          {type === "artist" ? null : (
            <span className="artist-link">{data.artist}</span>
          )}
        </Link>
      </>
    </div>
  ) : null;
}
