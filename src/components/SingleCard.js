import React from 'react';
import './SingleCard.css'

function singlecard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front"></img>
                <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back"></img>
            </div>
        </div>
    );
}

export default singlecard;