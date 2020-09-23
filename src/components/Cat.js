import React, { useState, useEffect } from "react";
import { checkStatus } from "../helpers/httpStatusCheck";
import Next from "./Next";
import Prev from "./Prev";

export default function Cat(props) {
  const [cats] = useState(
    JSON.parse(window.sessionStorage.getItem("catBreeds"))
  );
  const [catImgs, setCatImgs] = useState(null);
  const [currentCat] = useState(
    cats.find((cat) => cat.name === props.match.params.breed)
  );

  useEffect(() => {
    const imgProm = fetch(
      `https://api.thecatapi.com/v1/images/search?breed_id=${currentCat.id}&limit=5`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.REACT_APP_CAT_API}`,
        },
      }
    );

    imgProm
      .then(checkStatus)
      .then((res) => res.json())
      .then((imgs) => {
        let catz = imgs.map((cat) => cat.url);
        setCatImgs(catz);
      });
  }, []);

  const results =
    catImgs === null ? (
      <div>Loading...</div>
    ) : (
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <div style={{ width: "100vw", display: "block", fontSize: "30px" }}>
          {props.match.params.breed}
        </div>
        {catImgs.map((catUrl) => (
          <img width="20%" height="20%" src={catUrl} alt="" />
        ))}
        <Next current={props.match.params.breed} />
        <Prev current={props.match.params.breed} />
        <a
          href="/"
          style={{ position: "absolute", right: "50%", bottom: "5%" }}
        >
          Home
        </a>
      </div>
    );
  return results;
}
