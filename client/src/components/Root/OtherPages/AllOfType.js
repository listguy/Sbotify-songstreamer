import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Thumbnail from "../Home/components/Thumbnail";
import { Mixpanel } from "../services/AnalyticsManager";
import { getAll } from "../services/wrapper";

export default function AllOfType(props) {
  const [data, setData] = useState([]);
  const { type } = useParams();
  const legitPath = ["songs", "albums", "artists", "playlists"];
  const path = useLocation().pathname;

  const fetchData = async (type) => {
    if (!legitPath.includes(type.toLowerCase()))
      props.history.push("/page/not/found");

    const fetchedData = await getAll(type);
    setData(fetchedData);
  };

  useEffect(() => {
    fetchData(type);
    Mixpanel.track("Path Change", { path: path });
  }, [type]);

  const Grid = styled.div`
    width: 80vw;
    display: grid;
    margin: 5vh auto;
    justify-content: center;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 3vh 2vw;
  `;

  const Header = styled.span`
    margin-top: 2vh;
    margin-left: 3vw;
    font-size: 6vh;
    font-weight: bold;
  `;

  return (
    <>
      <Header>All {type}</Header>
      {data[0] ? (
        <Grid>
          {data.map((d) => (
            <Thumbnail data={d} options={{ type }} />
          ))}
        </Grid>
      ) : null}
    </>
  );
}
