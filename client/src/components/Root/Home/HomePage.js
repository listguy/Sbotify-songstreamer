import React from "react";
import TopThreeDisplay from "./components/TopThreeDisplay";
import "./styles/HomePage.css";

function HomePage() {
  return (
    <>
      <TopThreeDisplay type="artists" />
      <TopThreeDisplay type="albums" />
      <TopThreeDisplay type="songs" />
      <TopThreeDisplay type="playlists" />
    </>
  );
}

export default HomePage;
