import React from "react";

const images = require.context("./images/cards", true);
const imageList = images.keys().map((image) => images(image));

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function DisplayCards() {
  const shuffledCards = shuffleCards(imageList);
  return (
    <div>
      {shuffledCards.map((image, index) => (
        <img key={index} src={image} alt={`card-${index}`} className="card" />
      ))}
    </div>
  );
}

export default DisplayCards;
