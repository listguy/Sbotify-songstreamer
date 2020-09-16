import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFromDB } from "../wrapper";
import SongList from "./components/SongList";
import Carousela from "../components/Carousela";
import Thumbnail from "../Home/components/Thumbnail";

export default function ArtistPage() {
  const [data, setData] = useState();
  const path = useLocation().pathname;
  const artistId = useParams().id;
  const pathes = [
    path,
    `/top/albums?filter=artist&id=${artistId}`,
    `/top/songs?filter=artist&id=${artistId}`,
  ];

  useEffect(() => {
    // getFromDB(path).then((result) => {
    //   setData(result);
    // });
    fetchAllData(pathes);
  }, [path]);

  const fetchAllData = async (p) => {
    const results = await Promise.all(
      p.map((path) => getFromDB(path).then((d) => d))
    );
    console.log(results);
    setData(results);
  };

  return data ? (
    <>
      <div id="container">
        <div id="top" style={{ backgroundImage: `url(${data[0].media})` }}>
          <div id="details">
            <h1>{data[0].title}</h1>
            <span id="type">Artist</span>
          </div>
          <div id="cover">{/* <img src={data[0].media} /> */}</div>
        </div>
      </div>
      Top songs <div>{<SongList songs={data[2]} />}</div>
      Albums{" "}
      <div>
        {<Carousela Template={Thumbnail} data={data[1]} count={3} step={1} />}
      </div>
    </>
  ) : null;
}
