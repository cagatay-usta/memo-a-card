import React from "react";

function DisplayCards({ cards, handleClick }) {

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