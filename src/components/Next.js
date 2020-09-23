import React, { useState, useEffect } from "react";
import { checkStatus } from "../helpers/httpStatusCheck";

export default function Next(props) {
  const [cats] = useState(
    JSON.parse(window.sessionStorage.getItem("catBreeds"))
  );
  const currentIndex = cats.findIndex((c) => c.name === props.current);
  const next =
    currentIndex === cats.length - 1 ? (
      <a
        id="next"
        href={"/breeds/" + cats[0].name}
        style={{ position: "absolute", right: "2%", bottom: "5%" }}
      >
        Next
      </a>
    ) : (
      <a
        id="next"
        href={"/breeds/" + cats[currentIndex + 1].name}
        style={{ position: "absolute", right: "2%", bottom: "5%" }}
      >
        Next
      </a>
    );

  return next;
}
