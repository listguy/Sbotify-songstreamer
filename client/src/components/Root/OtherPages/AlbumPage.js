import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFromDB } from "../services/wrapper";
import SongList from "./components/SongList";
import ArtistCircleWidg from "./components/ArtistCircleWidg";
import { Mixpanel } from "../services/AnalyticsManager";
import "./styles/AlbumPage.css";

export default function AlbumPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;
  const albumId = useParams().id;

  useEffect(() => {
    getData(path);
    Mixpanel.track("Path Change", { path: path });
  }, [path]);

  const getData = useCallback(async () => {
    const album = await getFromDB(`/albums/${albumId}`);
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
