import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaEye } from "react-icons/fa";
import "../styles/Thumbnail.css";

export default function Thumbnail(props) {
  const { data, rank, options } = props;
  const type = options.type;

  // useEffect(() => {
  //   if (data && data.media !== "") {
  //     media =
  //       type === "songs"
  //         ? `https://img.youtube.com/vi/${data.media
  //             .match(/=.*/)[0]
  //             .slice(1)}/0.jpg`
  //         : data.media;
  //   }
  // }, [type]);

  return data ? (
    <div
      className="thumbnail"
      style={type === "artists" ? { backgroundColor: "unset" } : null}
    >
      <span className="rank">{rank}</span>
      <div className="thumb-img">
        <div class="overlay-options">
          {type === "songs" ? <FaPlay /> : <FaEye />}
        </div>
        <Link to={`/${type}/${data.id}`}>
          {data.media !== "" && (
            <img
              src={
                type === "songs"
                  ? `https://img.youtube.com/vi/${data.media
                      .match(/=.*/)[0]
                      .slice(1)}/0.jpg`
                  : data.media
              }
              style={type === "artists" ? { borderRadius: "50%" } : null}
            />
          )}
        </Link>
      </div>
      <>
        <span className="title">{data.title}</span>
        {data.Artist ? (
          <Link to={`/artists/${data.Artist.id}`}>
            <span className="artist-link">{data.Artist.title}</span>
          </Link>
        ) : null}
      </>
    </div>
  ) : null;
}
