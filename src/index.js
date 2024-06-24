import {Pokemon, makePokemon, createPokemonDiv} from './modules/pokemon.js';

//Call a fetch to get info based on the Pokemon and turn it into the Pokemon class

//Two Promises for the left and right Pokemon
const leftPokemonPromise = getRandPokemon();
const rightPokemonPromise = getRandPokemon();

Promise.all([leftPokemonPromise, rightPokemonPromise]).then((values)=> {
    const leftPokemon = values[0];
    const rightPokemon = values[1];

    document.getElementById("leftPokemon").appendChild(createPokemonDiv(leftPokemon.name, leftPokemon.url));
    document.getElementById("rightPokemon").appendChild(createPokemonDiv(rightPokemon.name, rightPokemon.url));
});

async function getRandPokemon(){
    const max = 800;
    const id = Math.floor(Math.random() * max);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await response.json();
    
    return new Pokemon(pokemon.id, pokemon.name,pokemon.sprites.other['official-artwork'].front_default);
    
}

