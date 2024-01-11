import Box from "./Box";
import React, { useEffect } from "react";
import "./style.css";
import Modal from "./Modal";

function App() {
  const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const winningMatrix = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const allBoxes = arr1.map((item, index) => {
    return { id: index, insideSign: null };
  });

  const X = "X";
  const O = "O";
  const data = [];

  const [boxes, setBoxes] = React.useState(allBoxes);
  const [flipped, setFlip] = React.useState(true);
  const [allMoves, setAllMoves] = React.useState([]);
  const [win, setWin] = React.useState(false);

  function getIdOfBox(id) {
    setBoxes((prevState) => {
      return prevState.map((box) => {
        if (box.id === id) {
          return {
            ...box,
            insideSign: flipped ? X : O,
          };
        }
        return box;
      });
    });
    setFlip(!flipped);
    setAllMoves((prevState) => {
      return [...prevState, { moveId: id, insideSign: flipped ? X : O }];
    });
  }

  function getSeparateMoves(allMoves, sign) {
    return allMoves
      .filter((move) => move.insideSign === sign)
      .map((item) => [item.moveId])
      .flat();
  }

  function trackWinner(allMoves, sign) {
    const Moves = getSeparateMoves(allMoves, sign);
    const winner = winningMatrix.some((item) => {
      return item.every((insideItem) => Moves.includes(insideItem));
    });

    if (winner) {
      return {
        sign: sign,
      };
    }
  }

  React.useEffect(() => {
    if (trackWinner(allMoves, "X") && trackWinner(allMoves, "X").sign === "X") {
      setWin("X");
    } else if (
      trackWinner(allMoves, "O") &&
      trackWinner(allMoves, "O").sign === "O"
    ) {
      setWin("O");
    }
  }, [allMoves]);

  function clickedBtn() {
    setWin(false);
    setAllMoves([]);
    setBoxes(allBoxes);
    setFlip(true);
  }

  const checkStalemate = boxes.every((square) => {
    return square.insideSign !== null;
  });

  const elements = boxes.map((item) => {
    return (
      <>
        <Box
          id={item.id}
          insideSign={item.insideSign}
          getIdOfBox={getIdOfBox}
        />
      </>
    );
  });

  return (
    <div className="whole-card">
      <div className="tic-tac-toe">{elements}</div>
      {(win || checkStalemate) && (
        <Modal winPlayer={win} clickedBtn={clickedBtn} stale={checkStalemate} />
      )}
    </div>
  );
}

export default App;
