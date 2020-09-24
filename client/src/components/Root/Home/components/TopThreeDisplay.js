import React, { useState, useEffect } from "react";
import { getAllBy, getFromDB } from "../../wrapper.js";
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
    // getFromDB(`/top/${type}?limit=7`).then(async (results) => {
    //   results = await Promise.all(
    //     results.map((item) =>
    //       getAllBy("artists", "artist", item.artist_id).then((artist) => {
    //         item.artist = artist[0].title;
    //         return item;
    //       })
    //     )
    //   );
    //   if (type === "playlists") console.log(results);
    //   setData(results);
    // });
    getFromDB(`/${type}/top?limit=10`).then((result) => setData(result));
  }, []);

  // console.log(data);
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

// return data ? (
//   <>
//     <span className="category">
//       Top 4 {type} {icons[type]}
//     </span>
//     <div className="top-three-display">
//       {data.map((obj, i) => (
//         <Thumbnail data={obj} type={type.slice(0, -1)} rank={i + 1} />
//       ))}
//     </div>
//   </>
// ) : null;

// Trying to make carousle
