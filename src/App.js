import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", isMatch: false },
  { src: "/img/potion-1.png", isMatch: false },
  { src: "/img/ring-1.png", isMatch: false },
  { src: "/img/scroll-1.png", isMatch: false },
  { src: "/img/shield-1.png", isMatch: false },
  { src: "/img/sword-1.png", isMatch: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isWinner, setIsWinner] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setGameStarted(true);
    setTurns(0);
    setIsWinner(0);
  };

  const Choose = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setTimeout(() => setIsWinner(isWinner + 1), 1000);
        setCards((prevcards) => {
          return prevcards.map((card) => {
            if (card.src === choiceOne.src) return { ...card, isMatch: true };
            return card;
          });
        });
        setTurn();
      } else {
        setTimeout(() => setTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, isWinner]);

  const setTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevturns) => prevturns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      {gameStarted ? (
        <div>
          <button onClick={shuffleCards}>New Game</button>
          {isWinner !== 6 ? (
            <div>
              <div className="cards">
                {cards.map((card) => (
                  <SingleCard
                    key={card.id}
                    card={card}
                    Choose={Choose}
                    isFliped={
                      choiceOne === card || choiceTwo === card || card.isMatch
                    }
                  />
                ))}
              </div>
              <p>Number of flips: {turns}</p>
            </div>
          ) : (
            <div>
              <p>Good job!! You are the Winner</p>
              <p>Click New game to start the New Game</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={shuffleCards}>Start Game</button>
          <p>Please Click on Start Game to start the Game</p>
        </div>
      )}
    </div>
  );
}

export default App;
