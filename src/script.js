import { Pokemon, Region } from './db.js';

Pokemon.pokemons.forEach(pokemon => {
    console.log(pokemon.region.name)
})