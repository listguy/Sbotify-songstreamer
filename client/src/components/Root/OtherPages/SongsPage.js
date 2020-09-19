import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Carousela from "../components/Carousela";
import GridThumbNail from "./components/GridThumbNail";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import { getAllBy, getFromDB } from "../wrapper";
import "./styles/SongPage.css";

export default function SongsPage() {
  // When trying to add following dummy data, code isn't working when coming from albums{
  //   song: {
  //     title: "",
  //     media: "",
  //   },
  //   moreSongs: [
  //     {
  //       song_id: "",
  //       title: "",
  //       views: "--",
  //       media: "",
  //     },
  //   ],
  // }
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

    for (let i in moreSongs) {
      if (moreSongs[i].song_id === song.song_id) {
        if (["artist", "other"].includes(fromWhereQuery.source)) {
          moreSongs.splice(i, 1);
          break;
        }
        song.track_number = i;
      }
    }
    debugger;
    const newData = { song, moreSongs };
    setData(newData);
  };

  return data ? (
    <div id="grid-container">
      {/* {fromWhereQuery.source==="playlist"&& <span>{`Playlist: ${data.song.album_name}`}</span>} */}
      {/* {fromWhereQuery.source === "album" && (
          <span
            style={{ fontSize: "2vh", fontWeight: "bold" }}
          >{`Album: ${data.song.album_name}`}</span>
        )} */}
      <div id="more">
        {
          <Carousela
            Template={GridThumbNail}
            data={data.moreSongs}
            diagonal={true}
            count={4}
            startIn={
              ["album", "playlist"].includes(fromWhereQuery.source)
                ? data.song.track_number
                : 0
            }
          />
        }
      </div>
      <div id="video">
        <iframe src={data.song.media.replace("watch?v=", "embed/")} />
      </div>
      <div id="s-details">
        <h1>
          {data.song.title}{" "}
          <span
            style={{
              fontSize: "3vh",
              float: "right",
              marginRight: "12vw",
              marginTop: "1.5vh",
            }}
          >
            Views: {data.song.views + 1}
          </span>
        </h1>
        <span id="s-artist">
          <ArtistCircleWidg
            pic={data.song.artist_pic}
            title={data.song.artist_name}
            id={data.song.artist_id}
          />
        </span>
        <h2>
          <Link to={`/watch/album/${data.song.album_id}`}>
            Album: {data.song.album_name}
          </Link>
        </h2>
      </div>
    </div>
  ) : null;
}
