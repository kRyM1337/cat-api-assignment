import React, { useState } from "react";

export default function Prev(props) {
  const [cats] = useState(
    JSON.parse(window.sessionStorage.getItem("catBreeds"))
  );

  const currentIndex = cats.findIndex((c) => c.name === props.current);
  const prev =
    currentIndex <= 0 ? (
      <a
        id="next"
        href={"/cat-api-assignment/breeds/" + cats[cats.length - 1].name}
        style={{ position: "absolute", left: "2%", bottom: "5%" }}
      >
        Prev
      </a>
    ) : (
      <a
        id="next"
        href={"/cat-api-assignment/breeds/" + cats[currentIndex - 1].name}
        style={{ position: "absolute", left: "2%", bottom: "5%" }}
      >
        Prev
      </a>
    );

  return prev;
}
