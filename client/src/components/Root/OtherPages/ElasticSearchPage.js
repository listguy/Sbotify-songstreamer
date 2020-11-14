import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { searchElastic } from "../services/wrapper";
import { Link } from "react-router-dom";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlbum } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { RiPlayListFill } from "react-icons/ri";
// import {} from "../services/wrapper";

const ResultsBox = styled.div`
  background-color: rgba(0, 0, 0, 0.58);
  height: 65vh;
  padding: 2vh 3vw;
  overflow-y: auto;
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

const StyledButtons = styled.span`
  cursor: pointer;
  padding: 8px;
  transition: 0.3s;

  :hover {
    background-color: rgba(250, 250, 250, 0.3);
  }
`;

const SearchBar = styled.input`
  background-color: rgba(0, 0, 0, 0.88);
  display: block;
  width: 76%;
  height: 4vh;
  margin: 2vh auto;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 1.5em;
  border: none;
  color: wheat;

  :focus {
    outline: none;
  }
`;

const icons = {
  song: <IoMdMusicalNote />,
  album: <MdAlbum />,
  artist: <GiMicrophone />,
  playlist: <RiPlayListFill />,
};

export default function ElasticSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState("");
  const [results, setResults] = useState();

  const elasticSearch = async () => {
    if (searchQuery === "") return;
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

  return (
    <div>
      <h1 style={{ marginLeft: "2vw" }}>Search</h1>
      <SearchBar
        label="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <ResultsBox>
        {searchQuery !== ""
          ? results?.map((results) => {
              return results[0] ? (
                <>
                  {index && (
                    <StyledButtons onClick={() => setIndex("")}>
                      Back
                    </StyledButtons>
                  )}
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
                            <h3 style={{ fontSize: "1.2em" }}>
                              {hit.data.title} {icons[hit.type]}
                            </h3>
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
                    <StyledButtons
                      onClick={() => setIndex(`${results[0].type}s`)}
                    >
                      Show All..
                    </StyledButtons>
                  )}
                </>
              ) : null;
            })
          : null}
      </ResultsBox>
    </div>
  );
}
