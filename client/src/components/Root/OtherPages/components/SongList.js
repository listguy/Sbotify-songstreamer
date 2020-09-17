import React from "react";
import GoPlay from "react-icons/go";
import { Link, useLocation } from "react-router-dom";

export default function SongList(props) {
  const { songs, onClickFunc, showIndex = false, showArtist = false } = props;
  const sourceQuery = useLocation().pathname.slice(7).replace("/", "=");

  return songs.map((song) => (
    <Link to={`/watch/song/${song.song_id}?${sourceQuery}`}>
      <li className="sl-li" onClick={onClickFunc}>
        {showIndex && <span className="sl-li-n">{song.track_number}</span>}
        <span className="sl-li-t">{song.title}</span>
        <span className="sl-li-l">
          {`${Math.floor(song.length / 60)}:${(
            (song.length % 60) +
            ""
          ).padStart(2, "0")}`}
        </span>
        <hr />
      </li>
    </Link>
  ));
}
