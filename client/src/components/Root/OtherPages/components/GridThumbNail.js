import React from "react";
import styled from "styled-components";
import { FaPlay } from "react-icons/fa";

export default function GridThumbNail(props) {
  const { data, count } = props;
  console.log(data);

  const Wrapper = styled.div`
    width: 90%;
    margin: 1vh 1vw 0;
    height: ${90 / count}%;
    display: flex;
  `;

  const Thumb = styled.img`
    width: 70%;
    height: 90%;
  `;

  const Details = styled.div`
    font-size: 2vh;
    padding: 1vh;
    &:hover {
      filter: brightness(1.5);
      cursor: pointer;
    }
  `;
  return (
    <Wrapper>
      <Link to="">
        <Thumb
          src={`https://img.youtube.com/vi/${data.media
            .match(/=.*/)[0]
            .slice(1)}/0.jpg`}
        />
        <Details>
          <div>
            {data.title}
            <br />
            {`${data.views} views`}
          </div>
        </Details>
      </Link>
    </Wrapper>
  );
}
