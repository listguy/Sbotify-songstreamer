import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getAllBy, getFromDB } from "../wrapper";
import SongList from "./components/SongList";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import "./styles/AlbumPage.css";

export default function AlbumPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;

  useEffect(() => {
    getData(path);
  }, [path]);

  const getData = useCallback(async (path) => {
    const details = await getFromDB(path);
    const songs = await getAllBy("songs", "album", details.album_id);
    const artist_img = await getAllBy("artists", "artist", details.artist_id);
    details.artist_img = artist_img[0].media;
    setData({ details: details, songs: songs });
  });

  return data ? (
    <div id="container">
      <section id="top">
        <div id="cover">
          <img src={data.details.media} />
        </div>
        <div id="details">
          <div id="title">{data.details.title}</div>
          <span id="type">Album</span>
          <br />
          By:
          <ArtistCircleWidg
            pic={data.details.artist_img}
            title={data.details.artist_name}
            id={data.details.artist_id}
          />
        </div>
      </section>
      <section id="songs">
        <div id="al-song-list">
          <SongList songs={data.songs} showIndex={false} border={true} />
        </div>
      </section>
    </div>
  ) : null;
}
