import React, { useEffect, useState } from "react";
import ScoreBoard from "./scoreBoard";
import { shuffleCards, imageList } from "./utils";
import DisplayCards from "./displayCards";
import "./index.css";

function App() {
  const [number, setNumber] = useState(7);
  const numberedCards = shuffleCards(imageList).slice(0, number);
  const [cards, setCards] = useState(shuffleCards(numberedCards));
  const [pickedCards, setPickedCards] = useState([]);
  const [scores, setScores] = useState({ score: 0, best: 0 });

  function handleClick(e) {
    const selectedCard = e.target.getAttribute("data-picked");
    if (pickedCards.some((card) => selectedCard === card)) {
      setScores((prevState) => ({ ...prevState, score: 0 }));
      setPickedCards([]);
    } else {
      setPickedCards(pickedCards.concat(selectedCard));
      console.log(pickedCards);
      setScores((prevState) => ({ ...prevState, score: scores.score + 1 }));
    }
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
      <ScoreBoard score={scores.score} best={scores.best} />
      <DisplayCards cards={cards} handleClick={handleClick} />
    </div>
  );
}

export default App;
