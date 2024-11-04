import { useState } from "react"

export default function Scoreboard({score}) {
    return(
        <div>
            <p>Current score: {score.currentScore} </p>
            <p>Best score: {score.bestScore}  </p>
        </div>
    )
}