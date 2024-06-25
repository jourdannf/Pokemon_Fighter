import {Pokemon, makePokemon, createPokemonDiv, replacePokemon} from './modules/pokemon.js';
import { checkTypes, getTypes } from './modules/check.js';



//Two Promises for the left and right Pokemon
const leftPokemonPromise = getRandPokemon();
const rightPokemonPromise = getRandPokemon();

Promise.all([leftPokemonPromise, rightPokemonPromise]).then((values)=> {
    const leftPokemon = values[0];
    const rightPokemon = values[1];

    document.getElementById("leftPokemon").prepend(createPokemonDiv(leftPokemon.name, leftPokemon.url));
    document.getElementById("rightPokemon").prepend(createPokemonDiv(rightPokemon.name, rightPokemon.url));
});

document.getElementById("leftPokemonEnter").addEventListener("click", searchPokemon);
document.getElementById("rightPokemonEnter").addEventListener("click", searchPokemon);

async function getRandPokemon(){
    const max = 800;
    const id = Math.floor(Math.random() * max);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await response.json();
    
    return new Pokemon(pokemon.id, pokemon.name,pokemon.sprites.other['official-artwork'].front_default);
    
}

function searchPokemon(e){
    //Fetch for a Pokemon
    //Return automatically if the input value is empty
    //Create an async function that gets the promise for the search
    //Once promise is resolved, create new Pokemon and replace it with the one in the proper div

    const inputValue = e.currentTarget.parentElement.previousElementSibling.value;
    const elemId = e.currentTarget.id;

    //Validation Checking
    if (inputValue.length < 3) {
        //Request that they enter a value that's three characters or more
        window.alert("You need to enter the name that is 3 or more characters.");
    }

    const pokemonPromise = findPokemon(inputValue.toLowerCase());

    pokemonPromise.then((pokemonFound) => {
        if (elemId === "leftPokemonEnter"){

            replacePokemon("leftPokemon", pokemonFound);
            
        }else if (elemId === "rightPokemonEnter"){
            replacePokemon("rightPokemon", pokemonFound);
        }

    }).catch((err)=> {
        console.log(err);
        window.alert("This is not a valid name of a Pokemon in the Pokedex. Please enter a valid name");
        //Clear Input Value and do Focus
    });

    async function findPokemon(name){//this is the same functionality as getRandPokemon so make it into a function
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        const pokemon = await response.json();

        return new Pokemon(pokemon.id, pokemon.name, pokemon.sprites.other['official-artwork'].front_default);
    }
    
}

document.getElementById("leftPokemon").addEventListener("click", pokemonBattle);

function pokemonBattle(e){
    //Create the Two Pokemon
    //Get the types of each pokemon
    //If both requests resolve then call the check types function in a double for loop
    //Each time the loop goes around, add to scores for each Pokemon

    let leftPokemonDiv = document.getElementById("leftPokemon");
    let rightPokemonDiv = document.getElementById("rightPokemon");

    let fighter = new Pokemon;
    fighter.name = e.currentTarget.firstElementChild.nextElementSibling.textContent;
    fighter.url = e.currentTarget.firstElementChild.src;

    let opponent = new Pokemon;
    if (e.currentTarget.id === "leftPokemon"){
        opponent.name = rightPokemonDiv.firstElementChild.nextElementSibling.textContent;
        opponent.url = rightPokemonDiv.firstElementChild.src;
    }else if (e.currentTarget.id === "rightPokemon"){
        opponent.name = leftPokemonDiv.firstElementChild.nextElementSibling.textContent;
        opponent.url = leftPokemonDiv.firstElementChild.src;
    }

    const fighterTypesPromise = getTypes(fighter);
    const opponentTypesPromise = getTypes(opponent);

    Promise.all([fighterTypesPromise, opponentTypesPromise]).then((values) => {
        fighter = values[0];
        opponent = values[1];

        var promises = [];

        for (let i = 0; i < fighter.types.length; i ++){
            for (let j = 0; j < opponent.types.length; j ++){
               let types = checkTypes(fighter.types[i], opponent.types[i]);
               promises.push(types[0]);
               promises.push(types[1]);
            }
        }

        Promise.all(promises).then((values)=>{
            for(let i= 0; i < values.length; i ++){
                if (i%2 === 0) {
                    fighter.addScore(values[i])
                }else {
                    opponent.addScore(values[i]);
                }
            }
            console.log(fighter.score);
            console.log(opponent.score);

            if (fighter.score > opponent.score){
                console.log(fighter.score)
                console.log("Fighter Wins!");
            }else if (fighter.score < opponent.score){
                console.log("Opponent Wins!");
            }else {
                console.log("There's been a tie.");
            }
        });


    });

}

