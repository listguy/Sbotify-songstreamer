import React, { useState, useEffect } from "react";
import getFromDB from "./wrapper";

export default function SearchBar() {
  const [results, setResults] = useState();

  const fetchResults = async (searchInput) => {
    getFromDB(`/`);
  };
  useEffect(() => {});
  return <div></div>;
}
