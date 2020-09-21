import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { ImSpotify } from "react-icons/im";

import HomePage from "./Home";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";

import {
  AlbumPage,
  ArtistPage,
  SongsPage,
  PlayListPage,
  PageNotFound,
  ALlOfPage,
} from "./OtherPages";

export default function Root() {
  return (
    <Router>
      <TopMenu />
      <Switch>
        <Route component={HomePage} exact path="/" />
        <Route component={ALlOfPage} exact path="/:type" />
        <Route component={SongsPage} exact path="/watch/song/:id" />
        <Route component={AlbumPage} exact path="/watch/album/:id" />
        <Route component={ArtistPage} exact path="/watch/artist/:id" />
        <Route component={PlayListPage} exact path="/watch/playlist/:id" />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
