import React from "react";
import TopThreeDisplay from "./components/TopThreeDisplay";
// import SearchBar from "./components/SearchBar";
import "./styles/HomePage.css";
// import { ImSpotify } from "react-icons/im";

function HomePage() {
  return (
    <>
      <TopThreeDisplay type="artists" />
      <TopThreeDisplay type="albums" />
      <TopThreeDisplay type="songs" />
      {/* <TopThreeDisplay type="playlists" /> */}
    </>
  );
}

export default HomePage;
