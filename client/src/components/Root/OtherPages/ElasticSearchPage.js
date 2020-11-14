import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchElastic } from "../services/wrapper";
import { Link } from "react-router-dom";
// import {} from "../services/wrapper";

const ResultsBox = styled.div`
  background-color: rgba(0, 0, 0, 0.58);
  height: 70vh;
  overflow-y: scroll;
`;
const RowResult = styled.div`
  background-color: rgba(30, 35, 32, 0.7);
  display: flex;
  height: 120px;
  width: 90%;
  margin: 2vh auto;
  padding: 10px 8px;
  cursor: pointer;
  transition: 0.4s;

  :hover {
    transform: translate(2px, 2px);
    background-color: rgba(80, 85, 82, 0.7);
  }
`;

const ItemImage = styled.img`
  width: 10%;
  height: 100%;
`;

const Details = styled.div`
  padding-left: 25px;
  display: flex;
  flex-direction: column;
`;

export default function ElasticSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState("");
  const [results, setResults] = useState();

  const elasticSearch = async () => {
    let size = index ? 3 : 100;
    const { content } = await searchElastic(searchQuery, index, size);
    // if (content.every((results) => !results[0]))
    //   setResults([{ type: "no results", data: [] }]);
    // console.log(content);
    setResults(content);
  };

  useEffect(() => {
    elasticSearch();
  }, [index, searchQuery]);

  console.log(index);
  console.log(results);
  return (
    <div>
      <h1>Search</h1>
      <input label="Search" onChange={(e) => setSearchQuery(e.target.value)} />
      <ResultsBox>
        {searchQuery !== ""
          ? results?.map((results) => {
              return results[0] ? (
                <>
                  {index && <span onClick={() => setIndex("")}>Back</span>}
                  <h2>
                    {results[0].type.slice(0, 1).toUpperCase() +
                      results[0].type.slice(1)}
                    s
                  </h2>
                  {results.map((hit) => {
                    return (
                      <Link to={`/${hit.type}s/${hit.data.id}`}>
                        <RowResult>
                          <ItemImage
                            src={
                              hit.type === "song"
                                ? `https://img.youtube.com/vi/${hit.data.media
                                    .match(/=.*/)[0]
                                    .slice(1)}/0.jpg`
                                : hit.data.media
                            }
                          />
                          <Details>
                            <h3>{hit.data.title}</h3>
                            <span>
                              <b>{hit.data.Album?.title}</b>{" "}
                              {hit.data.Artist?.title}
                            </span>
                          </Details>
                        </RowResult>
                      </Link>
                    );
                  })}
                  {!index && (
                    <span onClick={() => setIndex(`${results[0].type}s`)}>
                      Show All..
                    </span>
                  )}
                </>
              ) : null;
            })
          : null}
      </ResultsBox>
    </div>
  );
}
