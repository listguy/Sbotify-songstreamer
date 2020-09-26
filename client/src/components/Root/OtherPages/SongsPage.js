import React, { useState, useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import Carousela from "../components/Carousela";
import GridThumbNail from "./components/GridThumbNail";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import { getAllBy, getFromDB, getSingleById } from "../wrapper";
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
  const curId = useParams().id;
  const query = useLocation().search;
  const fromWhereQuery = {
    source: query
      ? ["artists", "albums", "playlists"].includes(query.match(/\w+/)[0])
        ? query.match(/\w+/)[0]
        : "other"
      : "other",
    id: query ? query.match(/\d+/) : undefined,
  };

  const order = {
    album: "track_number",
    artist: "-views",
    playlists: "",
    other: "-views",
  };

  useEffect(() => {
    fetchData(curId, fromWhereQuery);
    //Add views upddate
  }, [path]);

  const fetchData = async (curId, fromWhereQuery) => {
    // const song = await getFromDB(path);
    // const artist_pic = (await getAllBy("artists", "artist", song.artist_id))[0]
    //   .media;
    // song.artist_pic = artist_pic;

    // const moreSongs =
    //   fromWhereQuery.source === "playlist"
    //     ? (await getFromDB(`/watch/playlist/${fromWhereQuery.id}`))[0].songs
    //     : await getAllBy(
    //         `songs`,
    //         `${query ? fromWhereQuery.source : ``}`,
    //         `${query ? fromWhereQuery.id : ``}`,
    //         order[`${fromWhereQuery.source}`]
    //       );

    // for (let i in moreSongs) {
    //   if (moreSongs[i].song_id === song.song_id) {
    //     if (["artist", "other"].includes(fromWhereQuery.source)) {
    //       moreSongs.splice(i, 1);
    //       break;
    //     }
    //     song.track_number = i;
    //   }
    // }
    // debugger;
    // const newData = { song, moreSongs };
    // setData(newData);
    const song = await getSingleById("songs", curId);
    const suggestedSongs =
      fromWhereQuery.source !== "other"
        ? (await getSingleById(fromWhereQuery.source, fromWhereQuery.id)).Songs
        : await getFromDB("/songs/top?limit=10");

    if (["artists", "other"].includes(fromWhereQuery.source)) {
      for (let i in suggestedSongs) {
        if (suggestedSongs[i].id === song.id) {
          suggestedSongs.splice(i, 1);
          break;
        }
      }
    }

    setData({ song, suggestedSongs });
  };

  return data ? (
    <div id="grid-container">
      <div id="more">
        {
          <Carousela
            Template={GridThumbNail}
            data={data.suggestedSongs}
            diagonal={true}
            count={4}
            startIn={
              ["albums", "playlists"].includes(fromWhereQuery.source)
                ? data.song.trackNumber - 1
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
            pic={data.song.Artist.media}
            title={data.song.Artist.title}
            id={data.song.Artist.id}
          />
        </span>
        <h2>
          <Link to={`/albums/${data.song.Album.id}`}>
            Album: {data.song.Album.title}
          </Link>
        </h2>
      </div>
    </div>
  ) : null;
}
