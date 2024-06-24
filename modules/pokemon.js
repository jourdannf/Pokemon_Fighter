//Export a function that creates a Pokemon Div

//Creates a Pokemon Class that has all the info necessary for other parts of the application
export class Pokemon {
    #id;
    #name;
    #types = [];
    #url;
    #score = 0;
    constructor (id, name, url, score){
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
    get url(){
        return this.#url;
    }
    get score(){
        return this.#score;
    }
    addTypes(...types){
        //Validate that it's one of the many types a Pokemon can have
        //Add it to the array if it meets this criteria
        const validPokemonTypes = ["water", "fire", "grass", "flying", "poison", "ice", "normal", "fighting", "electric", "psychic", "steel", "ghost", "dark", "dragon", "fairy", "bug"];

        types.forEeach((type)=> {
            type = type.toLowerCase();
            if (validPokemonTypes.includes(type)){
                this.#types.push(type);
            }
        })
    }
    addScore(points){
        if(typeof score === "number"){
            this.#score += points;
        }
    }
}

export function makePokemon(id, name, type, url){

    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    // const pokemon = await response.json();

    //Create DocumentFragment
    //Append stuff to Document Fragment from response
    //Return DocumentFragment

    // const divFrag = document.createDocumentFragment;
    // const pokemonDiv = divFrag.appendChild(document.createElement("div"));
    // const pokemonImg = pokemonDiv.appendChild(document.createElement("img"));
    // pokemonImg.setAttribute("src", pokemon.other["official-artwork"].front_default);
    // pokemonDiv.appendChild(document.createTextNode(pokemon.name));
    
    // return divFrag;

};

export function createPokemonDiv(name, url){
    const divFrag = document.createDocumentFragment;
    const pokemonDiv = divFrag.appendChild(document.createElement("div"));
    const pokemonImg = pokemonDiv.appendChild(document.createElement("img"));
    pokemonImg.setAttribute("src", url);
    pokemonDiv.appendChild(document.createTextNode(name));
    
    return divFrag;
}