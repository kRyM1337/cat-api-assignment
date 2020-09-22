import React, { useState, useEffect } from "react";

export default function Cat(props) {
  return (
    <div>
      {props.match.params.breed}
      {window.sessionStorage.getItem("catBreeds")}
    </div>
  );
}
