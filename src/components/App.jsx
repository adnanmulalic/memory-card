import { useState } from 'react'
import '../styles/App.css'
import Scoreboard from './Scoreboard'
import Cards from './Cards'

function App() {
  const [score, setScore] = useState({currentScore: 0, bestScore: 0, clickedCards: new Set()});

  function cardClick(event) {
    console.log(event.target.innerText, event.target.id, score.clickedCards);
    let targetId = null;
    event.target.nodeName !== "DIV" ? targetId = event.target.parentNode.id : targetId = event.target.id;

    if (score.clickedCards.has(targetId)) {
      setScore({currentScore: 0, bestScore: score.currentScore > score.bestScore ? score.currentScore : score.bestScore, clickedCards: new Set()});
      console.log("Card exists");
    } else {
      setScore({...score, currentScore: score.currentScore + 1, clickedCards: score.clickedCards.add(targetId)});
    }
  }

  return (
    <div>
      <h1>Memory card game</h1>
      <Scoreboard score={score} />
      <Cards cardClick={cardClick} />
    </div>
  )
}

export default App
