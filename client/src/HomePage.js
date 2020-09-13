import React from "react";
import TopThreeDisplay from "./components/TopThreeDisplay";
import SearchBar from "./components/SearchBar";
import "./styles/HomePage.css";
import { ImSpotify } from "react-icons/im";

function HomePage() {
  return (
    <>
      <h1 className="header">
        Sbotify{"  "}
        <ImSpotify color="red" />
      </h1>
      <SearchBar />
      <TopThreeDisplay type="artists" />
      <TopThreeDisplay type="albums" />
      <TopThreeDisplay type="songs" />
    </>
  );
}

export default HomePage;
