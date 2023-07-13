import React from "react";

function DisplayCards({ cards, handleClick }) {
  return (
    <div>
      {cards.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`card-${index}`}
          data-picked={index}
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
