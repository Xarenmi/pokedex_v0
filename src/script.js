import { Pokemon, Region } from './db.js';

function regionOptions() {
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = ''; 

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Todos';
    regionSelect.appendChild(allOption);

    Region.regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.name;
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });
} 


function typeOptions() {
    const typeSelect = document.getElementById('type');
    typeSelect.innerHTML = ''; 

    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'Todos';
    typeSelect.appendChild(allOption);

    const pokemonTypes = []

    Pokemon.pokemons.forEach(pokemon => {
        if (pokemonTypes.indexOf(pokemon.kind) === -1) {
            pokemonTypes.push(pokemon.kind);
        }
    });

    console.log(pokemonTypes)

    pokemonTypes.forEach(type =>{
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

regionOptions();
typeOptions();


//document.getElementById('region').addEventListener('change', updateFilteredPokemon);


function setPokemonPic(pokemon) {
    const photoElement = document.getElementById('pokePic');
    const photoPath = `./src/img/${pokemon.name}.png`;
    photoElement.src = photoPath;
}