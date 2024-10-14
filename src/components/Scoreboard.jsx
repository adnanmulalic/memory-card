import { useState } from "react"

export default function Scoreboard({score}) {
    //setScore({currentScore: cardCount, bestScore: cardCount > score.currentScore ? cardCount : score.bestScore})
    return(
        <div>
            <p>Current score: {score.currentScore} </p>
            <p>Best score: {score.bestScore}  </p>
        </div>
    )
}