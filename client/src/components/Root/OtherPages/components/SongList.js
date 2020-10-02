import React from "react";
import { GoPlay } from "react-icons/go";
import { WiTime4 } from "react-icons/wi";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

export default function SongList(props) {
  const { songs, showIndex, border, options = undefined } = props;
  const sourceQuery = useLocation().pathname.slice(1).replace("/", "=");

  const ListWrapper = styled.div`
    font-size: 2.5vh;
    list-style-type: none;
    width: 100%;

    li {
      display: grid;
      grid-template-columns: minmax(4vh, 6vh) 5fr ${
        options ? `repeat(${options.length},3fr)` : ``
      } minmax(6vh, 8vh);
      padding: 1vh 0;
      border-bottom: ${border ? `1px solid;` : `none;`}
      text-align: left;
      &:hover {
        background-color: rgba(240, 240, 240, 0.05);
      }
      &:hover .dissappear {
        display: none;
      }
      &:hover .appear {
        display: inline-block;
      }
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }  
    }
    .appear {
      display: none;
    }

   
  `;

  const ListHeader = styled.li`
    font-weight: bold;
    filter: brightness(0.6);
    font-size: 3vh;
  `;

  return (
    <ListWrapper>
      <ListHeader>
        <span>#</span>
        <span>Title</span>
        {options && options.map((o) => <span>{o.replace("_", " ")}</span>)}
        <span>
          <WiTime4 />
        </span>
      </ListHeader>
      {songs.map((song, i) => (
        <Link to={`/songs/${song.id}?${sourceQuery}`}>
          <li>
            <span className="appear">{<GoPlay />}</span>
            {showIndex ? (
              <span>{song.track_number}</span>
            ) : (
              <span className="dissappear">{i + 1}</span>
            )}
            <span>{song.title}</span>
            {options &&
              options.map((option) => <span>{song[option].title}</span>)}
            <span className="sl-length">{`${Math.floor(song.length / 60)}:${(
              (song.length % 60) +
              ""
            ).padStart(2, "0")}`}</span>
          </li>
        </Link>
      ))}
    </ListWrapper>
  );
}
