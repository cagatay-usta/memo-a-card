import React from "react";

export default function ScoreBoard({ score, best }) {
  return (
    <div className="score-board">
      <div>score: {score}</div>
      <div>best: {best}</div>
    </div>
  );
}
