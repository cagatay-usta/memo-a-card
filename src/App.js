import React, { useEffect, useState, useRef } from "react";
import ScoreBoard from "./scoreBoard";
import { shuffleCards, initializeCards } from "./utils";
import DisplayCards from "./displayCards";
import "./index.css";

function App() {
  const [number, setNumber] = useState(0);
  const [cards, setCards] = useState(shuffleCards(initializeCards(number)));
  const [pickedCards, setPickedCards] = useState([]);
  const [scores, setScores] = useState({ score: 0, best: 0 });
  const inputElement = useRef();
  const [inputNumber, setInputNumber] = useState(7);

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
    if (number > 0) {
      setCards(shuffleCards(initializeCards(number)));
    }
  }, [number]);

  // check if won
  useEffect(() => {
    if (scores.score >= number && number !== 0) {
      window.alert("you won!");
      setScores({ best: scores.score, score: 0 });
      // restart the game by setting the number to 0
      setNumber(0);
    }
  }, [scores.score, number]);

  if (number === 0) {
    return (
      <div className="number-selection">
        <label htmlFor="number-input">Select the number of cards</label>
        <input
          type="number"
          placeholder="7"
          id="number-input"
          ref={inputElement}
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button type="button" className="number-input-button" onClick={() => setNumber(inputNumber)}>
          Select
        </button>
      </div>
    );
  } else {
    return (
      <>
        <div class="header">
          <div class="title-container">
            <div className="title">memo-a-card</div>
            <div className="title-text">don't click the same card twice!</div>
          </div>
            <ScoreBoard score={scores.score} best={scores.best} />
          
        </div><DisplayCards cards={cards} handleClick={handleClick} />
      </>
    );
  }
}

export default App;
