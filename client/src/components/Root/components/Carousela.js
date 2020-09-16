import React, { useMemo, useState } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import "./Carousela.css";

export default function Carousela(props) {
  const [curStep, setStep] = useState(0);
  const { Template, data, count, step } = props; //Template = how to show (a component that handles your data), data = what to show(array), count= How many to show(int), step = how many to slide
  const maxStep = useMemo(() => data.length - count, [data]);

  const slide = (steps) => {
    let newStep = Math.max(0, Math.min(curStep + steps, maxStep));
    setStep(newStep);
  };

  return (
    <div id="carousela-container">
      <div className="carousela-button" onClick={() => slide(-step)}>
        {<BiLeftArrow />}
      </div>
      <div id="surface">
        {data
          .slice(curStep, curStep + count)
          .map((d, i) => Template({ data: d, rank: curStep + i + 1 }))}
      </div>
      <div className="carousela-button" onClick={() => slide(step)}>
        {<BiRightArrow />}
      </div>
    </div>
  );
}

//Attention! Carousela returns your props as a property 'data' of a wrapper props. To extract the data do props.data
