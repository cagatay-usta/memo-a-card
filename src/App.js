import React, { useEffect, useState } from "react";
import ScoreBoard from "./scoreBoard";
import { shuffleCards, initializeCards } from "./utils";
import DisplayCards from "./displayCards";
import "./index.css";

function App() {
  const [number, setNumber] = useState(7);
  const [cards, setCards] = useState(shuffleCards(initializeCards(number)));
  const [pickedCards, setPickedCards] = useState([]);
  const [scores, setScores] = useState({ score: 0, best: 0 });

  function handleClick(e) {
    const selectedCard = e.target.getAttribute("data-picked");

    // update score and best score, and restart the round if the same card picked again
    if (pickedCards.some((card) => selectedCard === card)) {
      if (scores.score > scores.best) {
        setScores((prevState) => ({ ...prevState, best: scores.score }));
      }
      setScores((prevState) => ({ ...prevState, score: 0 }));
      setPickedCards([]);
      // if new cards selected, increment the score
    } else {
      setPickedCards(pickedCards.concat(selectedCard));
      setScores((prevState) => ({ ...prevState, score: scores.score + 1 }));
    }
    // shuffle the cards after each click
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

  // check if won
  useEffect(() => {
    if (scores.score === number) {
      window.alert("you won!");
      setScores({ best: scores.score, score: 0 });
      // replace cards with new ones
      setCards(shuffleCards(initializeCards(number)));
    }
  }, [scores.score, number]);

  return (
    <div>
      <ScoreBoard score={scores.score} best={scores.best} />
      <DisplayCards cards={cards} handleClick={handleClick} />
    </div>
  );
}

export default App;
