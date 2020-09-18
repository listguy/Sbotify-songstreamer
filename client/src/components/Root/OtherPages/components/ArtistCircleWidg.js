import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function ArtistCircleWidg(props) {
  const { pic, title, id } = props;

  const CircleImg = styled.img`
    width: 3vw;
    height: 3vw;
    border-radius: 50px;
    margin-left: 2vw;
    margin-right: 0.5vw;

    &:hover {
      filter: brightness(1.25);
      transition: 0.5s;
    }
  `;

  const NameTag = styled.span`
    &: hover {
      filter: brightness(1.25);
      transition: 0.5s;
    }
  `;

  return (
    <Link to={`/watch/artist/${id}`}>
      <CircleImg src={pic} />
      <NameTag>{title}</NameTag>
    </Link>
  );
}
