import React, { useMemo, useState } from "react";
import {
  BiRightArrow,
  BiLeftArrow,
  BiDownArrow,
  BiUpArrow,
} from "react-icons/bi";
import styled from "styled-components";

export default function Carousela(props) {
  const [curStep, setStep] = useState(0);
  const { Template, data, count = 5, step = 1, diagonal = false } = props; //Template = how to show (a component that handles your data), data = what to show(array), count= How many to show(int), step = how many to slide
  const maxStep = useMemo(() => data.length - count, [data]);

  const slide = (steps) => {
    let newStep = Math.max(0, Math.min(curStep + steps, maxStep));
    setStep(newStep);
  };

  const Container = styled.div`
    display: flex;
    flex-direction: ${diagonal ? "column;" : "row;"}
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 5vh auto;
  `;

  const Surface = styled.div`
    background-color: rgba(10, 10, 10, 0.2);
    display: flex;
    flex-direction: ${diagonal ? "column;" : "row;"}
    justify-content: center;
    height: 90%;
    width: 90%;
  `;

  const NavButton = styled.div`
    background-color: rgba(0, 0, 0, 0);
    border-radius: 50%;
    font-size: 4vw;

    &:hover {
      filter: brightness(1.5);
      cursor: pointer;
    }
  `;
  return (
    <Container id="carousela-container">
      <NavButton className="carousela-button" onClick={() => slide(-step)}>
        {diagonal ? <BiUpArrow /> : <BiLeftArrow />}
      </NavButton>
      <Surface id="surface">
        {data
          .slice(curStep, curStep + count)
          .map((d, i) => Template({ data: d, rank: curStep + i + 1, count }))}
      </Surface>
      <NavButton className="carousela-button" onClick={() => slide(step)}>
        {diagonal ? <BiDownArrow /> : <BiRightArrow />}
      </NavButton>
    </Container>
  );
}

//Attention! Carousela returns your props as a property 'data' of a wrapper props. To extract the data do props.data
