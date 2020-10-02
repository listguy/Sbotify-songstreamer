import React from "react";
import { GiCrackedDisc } from "react-icons/gi";
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
