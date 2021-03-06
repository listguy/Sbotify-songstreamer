import React, { useState } from "react";
import { search } from "./services/wrapper";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlbum } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { RiPlayListFill } from "react-icons/ri";
import "./SearchBar.css";

export default function SearchBar() {
  const [results, setResults] = useState();
  const [resultsOpen, setResultsOpen] = useState(false);
  const icons = {
    song: <IoMdMusicalNote />,
    album: <MdAlbum />,
    artist: <GiMicrophone />,
    playlist: <RiPlayListFill />,
  };

  const fetchResults = async (searchInput) => {
    if (searchInput === "") {
      setResults("");
      return;
    }
    const newRes = await search(searchInput);
    !newRes[0] ? setResults("No results found :/") : setResults(newRes);
  };

  const openResults = () => {
    setResultsOpen(true);
  };

  const closeResults = () => {
    setTimeout(() => setResultsOpen(false), 150);
  };

  const go = (type, id) => {
    window.location.assign(`/${type}s/${id}`);
  };

  return (
    <div id="search-container">
      <input
        id="search-bar"
        placeholder="Type name of a song, album or artist.."
        onFocus={openResults}
        onChange={(event) => fetchResults(event.target.value)}
        onBlur={closeResults}
      />
      {resultsOpen ? (
        <div id="search-res">
          {Array.isArray(results)
            ? results.map((res) => (
                <li onClick={() => go(res.type, res.id)}>
                  <span className="res-icon">{icons[res.type]}</span>
                  <span className="res-title">{res.title}</span>
                </li>
              ))
            : results}
        </div>
      ) : null}
    </div>
  );
}
