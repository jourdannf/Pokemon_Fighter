import { Pokemon } from "./pokemon.js";

//Determines who gets points added onto their score based on the types of Pokemon
//Checks the damage relation of type1 to type2 and vice versa
//Returns an array where:
//Index 0 is the amount of points type1 gains
//Index 1 is the amount of points type2 gains
export function checkTypes(type1, type2){
    //Run API to get info on type1
    //Do some for loops to extract how they're affected by type2

    async function damageBtwn(fighter, opponent){
        //Run API on fighter to find out how much damage goes to opponent
        const response = await fetch(`https://pokeapi.co/api/v2/type/${fighter}/`);
        const typeData = await response.json();

        const doubleDamage = typeData.damange_relations.double_damage_to;
        const halfDamage = typeData.damage_relations.half_damage_to;
        const noDamage = typeData.damage_relations.no_damage_to;

        if (doubleDamage.includes(opponent)){
            return 2;
        }else if(halfDamage.includes(opponent)){
            return 0.5;
        }else if(noDamage.includes(opponent)){
            return 0;
        }else {
            return 1;
        }
    }

    return [damageBtwn(type1,type2), damageBtwn(type2,type1)];
}

export async function getTypes(pokemon){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`);
    const pokeData = response.json();

    const types = pokeData.types;

    console.log(types);

    // types.forEach((type, i) => {
    //     pokemon.addType(type);
    // });
}

getTypes("mew");