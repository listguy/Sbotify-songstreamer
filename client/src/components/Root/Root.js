import React from "react";
import { Route, Switch } from "react-router-dom";
import { ImSpotify } from "react-icons/im";

import HomePage from "./Home";
import SinglePageView from "./SinglePageView";
import SearchBar from "./SearchBar";

export default function Root() {
  return (
    <>
      <section id="head">
        <h1
          className="header"
          onClick={() =>
            window.location.assign(
              `${window.location.protocol}//${window.location.host}/`
            )
          }
        >
          Sbotify{"  "}
          <ImSpotify color="red" />
        </h1>
        <SearchBar id="search-bar" />
      </section>
      <Route component={HomePage} exact path="/" />
      <Route component={SinglePageView} path="/watch" />
    </>
  );
}
