import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Carousela from "../components/Carousela";
import GridThumbNail from "./components/GridThumbNail";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import { getAllBy, getFromDB } from "../wrapper";
import "./styles/SongPage.css";

export default function SongsPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;
  const query = useLocation().search;
  const fromWhereQuery = {
    source: query ? query.match(/\w+/)[0] : "other",
    id: query ? query.match(/\d+/) : undefined,
  };
  const order = {
    album: "track_number",
    artist: "-views",
    playlists: "",
    other: "-views",
  };

  useEffect(() => {
    fetchData(path, fromWhereQuery);
  }, [path]);

  const fetchData = async (path) => {
    const song = await getFromDB(path);
    const artist_pic = (await getAllBy("artists", "artist", song.artist_id))[0]
      .media;
    song.artist_pic = artist_pic;

    const moreSongs =
      fromWhereQuery.source === "playlist"
        ? (await getFromDB(`/watch/playlist/${fromWhereQuery.id}`))[0].songs
        : await getAllBy(
            `songs`,
            `${query ? fromWhereQuery.source : ``}`,
            `${query ? fromWhereQuery.id : ``}`,
            order[`${fromWhereQuery.source}`]
          );
    if (["artist", "other"].includes(fromWhereQuery.source)) {
      console.log("here");
      for (let i in moreSongs) {
        if (moreSongs[i].song_id === song.song_id) {
          moreSongs.splice(i, 1);
        }
      }
    }
    setData({ song, moreSongs });
  };

  return data ? (
    <div id="grid-container">
      <div id="more">
        {
          <Carousela
            Template={GridThumbNail}
            data={data.moreSongs}
            diagonal={true}
            count={4}
            startIn={
              fromWhereQuery.source === "album" ? data.song.track_number - 1 : 0
            }
          />
        }
      </div>
      <div id="video">
        <iframe src={data.song.media.replace("watch?v=", "embed/")} />
      </div>
      <div id="s-details">
        <h1>{data.song.title}</h1>
        <span id="s-artist">
          <ArtistCircleWidg
            pic={data.song.artist_pic}
            title={data.song.artist_name}
            id={data.song.artist_id}
          />
        </span>
        <Link to={`/watch/album/${data.song.album_id}`}>
          <h2>Album: {data.song.album_name}</h2>
        </Link>
      </div>
    </div>
  ) : null;
}
