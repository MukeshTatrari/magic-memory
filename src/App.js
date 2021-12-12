import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';


const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false);

  //suffle cards
  const suffleCards = () => {
    const suffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(suffledCards);
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare two selected Cards

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (choiceOne.src === card.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choices and increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  useEffect(() => {
    suffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <p>Turns :{turns}</p>
    </div>
  );
}

export default App;
