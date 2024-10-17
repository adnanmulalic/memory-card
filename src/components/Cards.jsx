import { useEffect, useState } from "react"
import "../styles/Cards.css"

export default function Cards({cardClick, score}) {
    const [pokeData, setPokeData] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => {
            let newPokeSet = [];
            while (newPokeSet.length < 5) {
                let randomId = Math.floor(Math.random() * 151);
                let samePokemon = newPokeSet.some((pokemon) => randomId === pokemon.id - 1);
                console.log(samePokemon)
                !samePokemon && newPokeSet.push({name: data.results[randomId].name, id: randomId + 1});
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
                return (
                    <div className="card" key={pokemon.name}>
                        <p onClick={cardClick} className="cards">{pokemon.name}-{pokemon.id}</p>
                        {console.log(pokemon)}
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} />
                    </div>
            )
            })}
        </div>
    )
}