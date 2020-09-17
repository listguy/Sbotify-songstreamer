import React, { useState, useEffect, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { getAllBy, getFromDB } from "../wrapper";
import SongList from "./components/SongList";
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
          <Link to={`/watch/artist/${data.details.artist_id}`}>
            <img id="artist-pic" src={data.details.artist_img} />
            <span>{data.details.artist_name}</span>
          </Link>
        </div>
      </section>
      <section id="songs">
        <div id="al-song-list">
          <SongList songs={data.songs} showIndex={true} />
        </div>
      </section>
    </div>
  ) : null;
}
