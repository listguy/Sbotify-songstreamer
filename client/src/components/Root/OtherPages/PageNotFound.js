import React, { useEffect } from "react";
import { GiCrackedDisc } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import { Mixpanel } from "../services/AnalyticsManager";
import styled from "styled-components";

export default function PageNotFound(props) {
  const Button = styled.button`
    background-color: rgba(230, 230, 230, 0.3);
    color: unset;
    border-radius: 15px;
    padding: 1vw 1vh;
    border: none;
    &:hover {
      cursor: pointer;
      filter: brightness(1.25);
    }
  `;

  const path = useLocation().pathname;

  useEffect(() => {
    Mixpanel.track("Path Change", { path: path });
  });

  return (
    <>
      <div style={{ fontSize: "5vh", margin: "5vw 2vh" }}>
        Page not Found :/
        <br /> No such song, album, artist or playlist...
        <br />
        <GiCrackedDisc style={{ fontSize: "40vh" }} />
        <Button onClick={() => props.history.push("/")}>Back Home</Button>
      </div>
    </>
  );
}
