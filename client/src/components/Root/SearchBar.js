import React, { useState } from "react";
import { getFromDB } from "./wrapper";
import { Link } from "react-router-dom";
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
    const newRes = await getFromDB(`/api/search-sbotify/${searchInput}`);
    !newRes[0] ? setResults("No results found :/") : setResults(newRes);
  };

  const openResults = () => {
    setResultsOpen(true);
  };

  const closeResults = () => {
    setTimeout(() => setResultsOpen(false), 100);
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
                <Link to={`/watch/${res.type}/${res.id}`}>
                  <li>
                    <span className="res-icon">{icons[res.type]}</span>
                    <span className="res-title">{res.title}</span>
                  </li>
                </Link>
              ))
            : results}
        </div>
      ) : null}
    </div>
  );
}
