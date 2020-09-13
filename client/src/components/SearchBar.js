import React, { useState } from "react";
import getFromDB from "./wrapper";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlbum } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import "../styles/SearchBar.css";

export default function SearchBar() {
  const [results, setResults] = useState();
  const icons = {
    song: <IoMdMusicalNote />,
    album: <MdAlbum />,
    artist: <GiMicrophone />,
  };

  const fetchResults = async (searchInput) => {
    if (searchInput === "") {
      setResults("");
      return;
    }
    const newRes = await getFromDB(`/search-sbotify/${searchInput}`);
    console.log(newRes);
    setResults(newRes);
  };

  return (
    <>
      <input
        placeholder="Type name of a song, album or artist.."
        onChange={(event) => fetchResults(event.target.value)}
      />
      {results ? (
        <div id="search-res">
          {results.map((res) => (
            <a href={`//localhost:3001/${res.type}/${res.id}w`}>
              <li>
                <span className="res-title">{res.title}</span>
                <span className="res-icon">{icons[res.type]}</span>
              </li>
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
