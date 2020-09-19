import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ImSpotify } from "react-icons/im";
import { GiCrackedDisc } from "react-icons/gi";

import HomePage from "./Home";
import SearchBar from "./SearchBar";
import { AlbumPage, ArtistPage, SongsPage, PlayListPage } from "./OtherPages";

export default function Root() {
  return (
    <Router>
      <section id="head">
        <Link to="/">
          <h1 className="header">
            Sbotify{"  "}
            <ImSpotify color="red" />
          </h1>
        </Link>
        <SearchBar id="search-bar" />
      </section>

      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={SongsPage} exact path="/watch/song/:id" />
        <Route component={AlbumPage} exact path="/watch/album/:id" />
        <Route component={ArtistPage} exact path="/watch/artist/:id" />
        <Route component={PlayListPage} exact path="/watch/playlist/:id" />
        <Route
          render={() => (
            <h1>
              {"Page not found ;/"} <GiCrackedDisc />
            </h1>
          )}
        />
      </Switch>
    </Router>
  );
}
