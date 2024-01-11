import React from "react";

export default function Box({ id, getIdOfBox, insideSign }) {
  return (
    <div className="box" onClick={() => getIdOfBox(id)}>
      {insideSign}
    </div>
  );
}
