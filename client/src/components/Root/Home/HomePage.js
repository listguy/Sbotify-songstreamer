import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mixpanel } from "../services/AnalyticsManager";
import TopThreeDisplay from "./components/TopThreeDisplay";
import "./styles/HomePage.css";

function HomePage() {
  const path = useLocation().path;

  useEffect(() => {
    Mixpanel.track("Path Change", { path: path });
  }, []);
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
