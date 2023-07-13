import React, { useEffect, useState } from "react";
import { shuffleCards, imageList } from "./utils";
import DisplayCards from "./displayCards";
import "./index.css";

function App() {
  const [number, setNumber] = useState(7);
  const numberedCards = shuffleCards(imageList).slice(0, number);
  const [cards, setCards] = useState(shuffleCards(numberedCards));
  const [pickedCards, setPickedCards] = useState([]);
  const [score, setScore] = useState({ score: 0, best: 0 });

  function handleClick() {
    setCards((prevState) => {
      const newCards = [...shuffleCards(prevState)];
      return newCards;
    });
  }

  // shuffles cards on mount
  useEffect(() => {
    setCards((prevState) => {
      const newCards = [...shuffleCards(prevState)];
      return newCards;
    });
  }, []);

  return (
    <div>
      <DisplayCards cards={cards} handleClick={handleClick} />
    </div>
  );
}

export default App;
