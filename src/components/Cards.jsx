import { useEffect, useState } from "react"
import "../styles/Cards.css"


export default function Cards({cardClick}) {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonIds, setPokemonIds] = useState([]);

    function createPokeIds() {
        let idSet = new Set();
        while (idSet.size < 5) {
            let randomId = Math.floor(Math.random() * (152 - 1) + 1);
            idSet.add(randomId);
        }
        setPokemonIds([...idSet]);
    }

    function getImageUrl(id) { // https://vite.dev/guide/assets.html#new-url-url-import-meta-url
        return new URL(`../assets/gen-i/${id}.svg`, import.meta.url).href
    }

    function fetchPokemonObject(url) {
        return fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return {name: data.name, id: data.id, type: data.types[0].type.name};
        })
    }
    
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then((data) => { // returns array of 151 pokemons with names and url to their data
            Promise.all(data.results.map((result) => // fetch and resolve all 151 pokemon and return array of pokemon objects
            fetch(result.url) // can be replaced with function fetchPokemonObject(url) for shorter code
            .then((response) => response.json())
            .then((data) => {
            return {name: data.name, id: data.id, type: data.types[0].type.name};
            })
        ))
        .then((arrOfResolvedPokemons) => {
            createPokeIds();
            setPokemonData(arrOfResolvedPokemons);
            })
        })
    }, [])

    function multipleFunctions(event) {
        cardClick(event);
        createPokeIds();
    }

    

    return(
        <div id="cards">
            
            {pokemonData.filter((pokemon) => pokemonIds.includes(pokemon.id)).map((pokemon) => {
                return (
                    <div onClick={multipleFunctions} className={`${"card"} ${pokemon.type}`} key={pokemon.id} id={pokemon.id}>
                        <p>{pokemon.name}</p>
                        <img src={getImageUrl(pokemon.id)} alt={pokemon.name} /> {/* src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} */}
                    </div>
            )
            })}
        </div>
    )
}

