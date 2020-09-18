import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { ImSpotify } from "react-icons/im";

import HomePage from "./Home";
import SearchBar from "./SearchBar";
import { AlbumPage, ArtistPage, SongsPage, PlayListPage } from "./OtherPages";

export default function Root() {
  return (
    <>
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
        <Route component={SongsPage} path="/watch/song/:id" />
        <Route component={AlbumPage} path="/watch/album/:id" />
        <Route component={ArtistPage} path="/watch/artist/:id" />
        <Route component={PlayListPage} path="/watch/playlist/:id" />
        <Route render={() => <h2>Page not fount :\</h2>} />
      </Switch>
    </>
  );
}
