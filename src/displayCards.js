import React from "react";

function DisplayCards({ cards, handleClick }) {
  
  return (
    <div>
      {cards.map((card, index) => (
        <img
          key={index}
          src={card}
          alt={`card-${index}`}
          data-picked={card}
          className="card"
          onClick={(e) => {
            handleClick(e);
          }}
        />
      ))}
    </div>
  );
}

export default DisplayCards;
