import React from "react";

export default function SongList(props) {
  const { songs, onClickFunc, showIndex = false, showArtist = false } = props;
  console.log(songs);

  return songs.map((song) => (
    <li className="sl-li" onClick={onClickFunc}>
      {showIndex && <span className="sl-li-n">{song.track_number}</span>}
      <span className="sl-li-t">{song.title}</span>
      <div className="sl-li-l">
        {`${Math.floor(song.length / 60)}:${((song.length % 60) + "").padStart(
          2,
          "0"
        )}`}
      </div>
      <hr />
    </li>
  ));
}
