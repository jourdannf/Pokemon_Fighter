//Export a function that creates a Pokemon Div

//Creates a Pokemon Class that has all the info necessary for other parts of the application
export class Pokemon {
    #id;
    #name;
    #types = [];
    #url;
    #score = 0;
    constructor (id, name, url){
        this.#id = id;
        this.#name = name;
        this.#url = url;
    }
    get id(){
        return this.#id;
    }
    get name(){
        return this.#name
    }
    set name(val){
        if (typeof val === "string") {
            this.#name = val; 
        }
    }
    set url(val){
        if (typeof val === "string") {
            this.#url = val; 
        }
    }
    get url(){
        return this.#url;
    }
    get score(){
        return this.#score;
    }
    get types(){
        return this.#types;
    }
    addType(type){
        //Validate that it's one of the many types a Pokemon can have
        //Add it to the array if it meets this criteria
        const validPokemonTypes = ["water", "fire", "grass", "flying", "poison", "ice", "normal", "fighting", "electric", "psychic", "steel", "ghost", "dark", "dragon", "fairy", "bug"];

        type = type.toLowerCase();
        if (validPokemonTypes.includes(type)){
            this.#types.push(type);
        }

    }
    addScore(points){
        if(typeof points === "number"){
            this.#score += points;
        }
    }
}

//Returns Pokemon as a promise based on id or name given to function
export async function makePokemon(id){

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await response.json();

    return new Pokemon(pokemon.id, pokemon.name, pokemon.sprites.other['official-artwork'].front_default);

};

export function createPokemonDiv(name, url){
    const divFrag = document.createDocumentFragment();
    const pokemonImg = divFrag.appendChild(document.createElement("img"));
    pokemonImg.setAttribute("src", url);
    const pokemonName = divFrag.appendChild(document.createElement("h3"));
    pokemonName.appendChild(document.createTextNode(name))
    
    return divFrag;
}

//Replaces whichPokemon on screen with replacement
//Inputs: whichPokemon is the left or right Pokemon, replacement is a Pokemon class
export function replacePokemon(whichPokemon, replacement){
    if(document.getElementById("winners").firstElementChild){
        document.getElementById("winners").firstElementChild.remove()
    }

    let childrenList = document.getElementById(whichPokemon).children;
    
    while(childrenList.length > 1){
        document.getElementById(whichPokemon).removeChild(document.getElementById(whichPokemon).firstChild);
    }

    document.getElementById(whichPokemon).prepend(createPokemonDiv(replacement.name, replacement.url));
}