import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getAllBy, getFromDB } from "../wrapper";
import SongList from "./components/SongList";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import "./styles/AlbumPage.css";

export default function AlbumPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;
  const albumId = useParams().id;

  useEffect(() => {
    getData(path);
  }, [path]);

  const getData = useCallback(async (path) => {
    // const details = await getFromDB(path);
    // const songs = await getAllBy("songs", "album", details.album_id);
    // const artist_img = await getAllBy("artists", "artist", details.artist_id);
    // details.artist_img = artist_img[0].media;
    // setData({ details: details, songs: songs });
    const album = await getFromDB(`/albums/${albumId}`);
    console.log(album);
    setData(album);
  });

  return data ? (
    <div id="container">
      <section id="top">
        <div id="cover">
          <img src={data.media} />
        </div>
        <div id="details">
          <div id="title">{data.title}</div>
          <span id="type">Album</span>
          <br />
          By:
          <ArtistCircleWidg
            pic={data.Artist.media}
            title={data.Artist.title}
            id={data.Artist.id}
          />
        </div>
      </section>
      <section id="songs">
        <div id="al-song-list">
          <SongList songs={data.Songs} showIndex={false} border={true} />
        </div>
      </section>
    </div>
  ) : null;
}
