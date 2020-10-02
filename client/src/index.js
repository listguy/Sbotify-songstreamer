import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Root from "./components/Root";

import "./index.css";

document.title = "Sboftify";
render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById("root")
);
