import {Pokemon, makePokemon, createPokemonDiv, replacePokemon} from './modules/pokemon.js';
import { checkTypes, getTypes } from './modules/check.js';
import { shuffleTheDeck } from './modules/shuffle.js';



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

//Returns a promise of a random Pokemon
export function getRandPokemon(){
    const max = 800;
    const id = Math.floor(Math.random() * max);

    return makePokemon(id)
    
}

function searchPokemon(e){
    //Fetch for a Pokemon
    //Return automatically if the input value is less than 3 characters
    //Create an async function that gets the promise for the search
    //Once promise is resolved, create new Pokemon and replace it with the one in the proper div

    const inputValue = e.currentTarget.parentElement.previousElementSibling.value;
    const elemId = e.currentTarget.id;

    //Validation Checking
    if (inputValue.length < 3) {
        //Request that they enter a value that's three characters or more
        window.alert("You need to enter the name that is 3 or more characters.");
    }

    const pokemonPromise = makePokemon(inputValue.toLowerCase());

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
    
}

document.getElementById("leftPokemon").addEventListener("click", pokemonBattle);
document.getElementById("rightPokemon").addEventListener("click", pokemonBattle);

function pokemonBattle(e){
    //Create the Two Pokemon
    //Get the types of each pokemon
    //If both requests resolve then call the check types function in a double for loop
    //Each time the loop goes around, add to scores for each Pokemon

    const winners = document.getElementById("winners");
    
    

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

            if(winners.firstElementChild){
                winners.firstElementChild.remove();
            }

            const winnersText = winners.appendChild(document.createElement("h2"));
            

            if (fighter.score > opponent.score){
                winnersText.textContent = `${fighter.name} is stronger than ${opponent.name}`;
                console.log("Fighter Wins!");
            }else if (fighter.score < opponent.score){
                winnersText.textContent = `${opponent.name} is stronger than ${fighter.name}`;
                console.log("Opponent Wins!");
            }else {
                winnersText.textContent = "These pokemon are equal in strength!";
                console.log("There's been a tie.");
            }
        });


    });

}

document.getElementById("shuffle").addEventListener("click", shuffleTheDeck);