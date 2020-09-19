import React from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";

export default function GridThumbNail(props) {
  const { data, count } = props;
  const currentSongId = useParams().id;
  const source = useLocation().search;

  const path = `/watch/song/${data.song_id}${source}`;

  const Wrapper = styled.div`
  background-color:  ${
    data.song_id + "" === currentSongId &&
    ["album", "playlist"].includes(source.match(/\w+/)[0])
      ? `rgba(230,230,230,0.4);`
      : ``
  }
    width: 90%;
   padding: 1vh;
    height: ${90 / count}%;
    display: flex;
    &:hover {
      filter: brightness(1.2);
      cursor: pointer;
    }
  `;

  const Thumb = styled.img`
    width: 70%;
    height: 90%;
  `;

  const Details = styled.div`
    font-size: 2vh;
    padding: 1vh;
  `;

  const redirect = () => {
    window.location.assign(path);
  };
  console.log(data.media !== "");
  debugger;
  return (
    <Wrapper onClick={redirect}>
      {
        <Thumb
          src={`https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`}
        />
      }
      <Details>
        <div>
          {data.title}
          <br />
          {`${data.views} views`}
        </div>
      </Details>
    </Wrapper>
  );
}
