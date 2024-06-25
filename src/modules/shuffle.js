import { replacePokemon } from "./pokemon.js";
import { getRandPokemon } from "../index.js";

export function shuffleTheDeck(){
    let leftPokemonPromise = getRandPokemon();
    let rightPokemonPromise = getRandPokemon();

    Promise.all([leftPokemonPromise, rightPokemonPromise]).then((values)=> {
        replacePokemon("leftPokemon", values[0]);
        replacePokemon("rightPokemon", values[1]);
    });
}