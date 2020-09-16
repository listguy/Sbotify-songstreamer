import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFromDB } from "../wrapper";

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
      <div id="grid">
        <div id="details">
          <span id="type">{data.type}</span>
          <h1>{data[0].title}</h1>
        </div>
        <div id="cover">
          <img src={data[0].media} />
        </div>
      </div>
      Top Albums <div>{data[1].map((a) => a.title)}</div>
      Top songs <div>{data[2].map((s) => s.title)}</div>
    </>
  ) : null;
}
