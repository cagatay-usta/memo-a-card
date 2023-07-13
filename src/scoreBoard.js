import React from "react";

export default function ScoreBoard({ score, best }) {
  return (
    <>
      <div>score: {score}</div>
      <div>best: {best}</div>
    </>
  );
}
