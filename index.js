import {Pokemon, makePokemon, createPokemonDiv} from './modules/pokemon.js';

//Call a fetch to get info based on the Pokemon and turn it into the Pokemon class

const leftPokemon = getRandPokemon();
const rightPokemon = getRandPokemon();

async function getRandPokemon(){
    const max = 800;
    const id = Math.floor(Math.random() * max);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await response.json();
    console.log(pokemon);
}

