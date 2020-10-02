import React, { useMemo, useState } from "react";
import {
  BiRightArrow,
  BiLeftArrow,
  BiDownArrow,
  BiUpArrow,
} from "react-icons/bi";
import styled from "styled-components";

export default function Carousela(props) {
  debugger;
  const {
    Template,
    data,
    count = 5,
    step = 1,
    diagonal = false,
    startIn = 0,
    options,
  } = props; //Template = how to show (a component that handles your data), data = what to show(array), count= How many to show(int), step = how many to slide
  console.log(data);
  const maxStep = useMemo(() => data.length - count, [data]);
  const [curStep, setStep] = useState(clamp(startIn, 0, maxStep));
  const slide = (steps) => {
    let newStep = clamp(steps + curStep, 0, maxStep);
    setStep(newStep);
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

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
    border-top: 1px solid;
    border-bottom: 1px solid;
    padding: 1vh 0;
    display: flex;
    flex-direction: ${diagonal ? "column;" : "row;"}
    justify-content: start;
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
          .map((d, i) =>
            Template({ data: d, rank: curStep + i + 1, count, options })
          )}
      </Surface>
      <NavButton className="carousela-button" onClick={() => slide(step)}>
        {diagonal ? <BiDownArrow /> : <BiRightArrow />}
      </NavButton>
    </Container>
  );
}

//Attention! Carousela returns your props as a property 'data' of a wrapper props. To extract the data do props.data
