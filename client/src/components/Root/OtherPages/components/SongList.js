import React from "react";
import { GoPlay } from "react-icons/go";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

export default function SongList(props) {
  const { songs, showIndex, border, options = undefined } = props;
  const sourceQuery = useLocation().pathname.slice(7).replace("/", "=");

  const ListWrapper = styled.div`
    font-size: 2.5vh;
    list-style-type: none;
    width: 100%;

    li {
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
    }
    .appear {
      display: none;
    }
    span {
      display: inline-block;
      min-width: 2vw;
      padding-left: 1vw;
    }
    .sl-length {
      float: right;
      margin-right: 1.5vw;
    }
  `;

  return (
    <ListWrapper>
      <th>
        <td>#</td>
        <td>title</td>
        {options && options.map((o) => <td>{o}</td>)}
        <td>length</td>
      </th>
      {songs.map((song, i) => (
        <Link to={`/watch/song/${song.song_id}?${sourceQuery}`}>
          <li>
            <span className="appear">{<GoPlay />}</span>
            {showIndex ? (
              <span>{song.track_number}</span>
            ) : (
              <span className="dissappear">{i + 1}</span>
            )}
            <span>{song.title}</span>
            {options && options.map((option) => <span>{song[option]}</span>)}
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

// const ListWrapper = styled.div`
//   font-size: 2.5vh;
//   list-style-type: none;
//   width: 100%;
//   margin-left: 0;

//   li {
//     padding: 1vh 0;
//     border-bottom: ${border ? `1px solid;` : `none;`}
//     text-align: left;
//     &:hover {
//       background-color: rgba(240, 240, 240, 0.05);
//     }
//     &:hover .dissappear {
//       display: none;
//     }
//     &:hover .appear {
//       display: inline-block;
//     }
//   }
//   .appear {
//     display: none;
//   }
//   span {
//     display: inline-block;
//     min-width: 2vw;
//     padding-left: 1vw;
//   }
//   .sl-length {
//     float: right;
//     margin-right: 1.5vw;
//   }
// `;

// const ListWrapper = styled.table`
//     font-size: 2.5vh;
//     margin-left: 0;
//     width: 100%;

//     tr {
//       padding: 1vh 0;
//       border-bottom: ${border ? `1px solid;` : `none;`}
//       text-align: left;
//       &:hover {
//         background-color: rgba(240, 240, 240, 0.05);
//       }
//       &:hover .dissappear {
//         display: none;
//       }
//       &:hover .appear {
//         display: inline-block;
//       }
//     }
//     .appear {
//       display: none;
//     }
//     td {
//       padding: .5vw;
//       min-width: 2vw;
//     }
//     .sl-length {
//       margin-right: 1.5vw;
//     }
//   `;
