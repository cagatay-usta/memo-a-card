import React, { useState } from "react";

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

function DisplayCards({ number }) {
  const pickedCards = shuffleCards(imageList).slice(0, number);
  const [cards, setCards] = useState(shuffleCards(pickedCards));

  function handleClick() {
    setCards((prevState) => {
      const newCards = [...shuffleCards(prevState)];
      return newCards;
    });
  }

  return (
    <div>
      {cards.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`card-${index}`}
          className="card"
          onClick={() => {
            handleClick();
          }}
        />
      ))}
    </div>
  );
}

export default DisplayCards;
