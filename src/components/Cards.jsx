import { useEffect, useState } from "react"
import "../styles/Cards.css"

export default function Cards({cardClick, score}) {
    const [pokeData, setPokeData] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
            let newPokeSet = new Set();
            while (newPokeSet.size < 5) {
                let randomId = Math.floor(Math.random() * 151);
                newPokeSet.add(data.results[randomId]);
            }
            setPokeData([...newPokeSet]);
        })
    }, [score])

    function displayPokemon(arr) {
        arr.forEach(pokemon => {
            return pokemon.name;
        });
    }

    return(
        <div id="cards">
            {pokeData.map((pokemon) => {
                return <p onClick={cardClick} className="cards" key={pokemon.name}>{pokemon.name}</p>
            })}
        </div>
    )
}