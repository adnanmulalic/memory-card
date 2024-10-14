import { useState } from 'react'
import '../styles/App.css'
import Scoreboard from './Scoreboard'
import Cards from './Cards'

function App() {
  const [count, setCount] = useState(0);
  const [score, setScore] = useState({currentScore: 0, bestScore: 0, clickedCards: new Set()});

  function cardClick(event) {
    console.log(event.target.innerText);
    if (score.clickedCards.has(event.target.innerText)) {
      setScore({currentScore: 0, bestScore: score.currentScore > score.bestScore ? score.currentScore : score.bestScore, clickedCards: new Set()});
      console.log("Card exists");
    } else {
      setScore({...score, currentScore: score.currentScore + 1, clickedCards: score.clickedCards.add(event.target.innerText)});
    }
  }

  return (
    <div>
      <h1>Memory card game</h1>
      <Scoreboard score={score} />
      <Cards cardClick={cardClick} score={score} />
    </div>
  )
}

export default App
