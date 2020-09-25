import React from "react";
import SearchBar from "./SearchBar";
import { ImSpotify, ImUser } from "react-icons/im";
import styled from "styled-components";
import { Link } from "react-router-dom";

const backgroundColor = "rgb(15,15,15)";

export default function TopMenu() {
  const TopMenu = styled.div`
    background-color: ${backgroundColor};
    display: flex;
    align-items: center;
    height: 10vh;
    width: 100%;

    span {
      cursor: pointer;
      padding: 0.5vw;
    }
  `;

  const NavButtons = styled.div`
    span {
      margin: 0 1vh;
      font-size: 2.5vh;
      &:hover {
        transition: 1s ease-in-out;
        background-color: rgba(230, 230, 230, 0.8);
        color: black;
      }
    }
  `;

  const HomeButton = styled.span`
    font-size: 6vh;
    margin: 0 10vw 0 1vw;
    color: white;
  `;

  const Profile = styled.span`
    margin-left: auto;
    margin-right: 3vw;

    &:hover {
      transition: 1s ease-in-out;
      background-color: rgba(240, 240, 240, 0.85);
      color: ${backgroundColor};
    }
  `;

  return (
    <TopMenu>
      <HomeButton>
        <Link to="/">
          Sbotify <ImSpotify color="red" />
        </Link>
      </HomeButton>
      <NavButtons>
        <span>
          <Link to="/songs">Songs</Link>
        </span>
        <span>
          <Link to="/albums">Albums</Link>
        </span>
        <span>
          <Link to="/artists">Artists</Link>
        </span>
        <span>
          <Link to="/playlists">Playlists</Link>
        </span>
      </NavButtons>
      <SearchBar />
      <Profile>
        <ImUser fontSize="4vh" />
        <span>Hello, User.</span>
      </Profile>
    </TopMenu>
  );
}
