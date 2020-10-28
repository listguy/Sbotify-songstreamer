import React, { useState, useEffect } from "react";
import { getFromDB } from "../../services/wrapper";
import Thumbnail from "./Thumbnail";
import Carousela from "../../components/Carousela";
import "../styles/TopThreeDisplay.css";
import { IoMdMusicalNote } from "react-icons/io";
import { MdAlbum } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { RiPlayListFill } from "react-icons/ri";

export default function TopThreeDisplay(props) {
  const { type } = props;
  const [data, setData] = useState([
    {
      id: "",
      title: "",
      media: "",
      Artist: { title: "", id: "" },
    },
  ]);
  const icons = {
    songs: <IoMdMusicalNote />,
    albums: <MdAlbum />,
    artists: <GiMicrophone />,
    playlists: <RiPlayListFill />,
  };

  useEffect(() => {
    getFromDB(`/${type}/top?limit=10`).then((result) => setData(result));
  }, []);

  return data ? (
    <div className="top-three-display">
      <span className="category">
        Top {` ${type[0].toUpperCase()}${type.slice(1)} `} {icons[type]}
      </span>
      <Carousela
        Template={Thumbnail}
        data={data}
        count={5}
        step={1}
        options={{ type }}
      />
    </div>
  ) : null;
}
