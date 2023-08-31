import { Pokemon, Region } from './db.js';

function setPokemonScreen(pokemon) {
    const photoElement = document.getElementById('pokepic');
    const photoPath = `./src/img/${pokemon.name}.png`;
    photoElement.src = photoPath;

    const thisRegion = document.getElementById('dis-reg');
    thisRegion.innerText = `REGION: ${pokemon.region.name}`.toUpperCase();

    const thisType = document.getElementById('dis-type');
    thisType.innerText = `TIPO: ${pokemon.kind}`.toUpperCase();

    switch(pokemon.kind){
        case 'Planta':
            thisType.style.backgroundColor = '#0d8448';
            break;
        default:
            thisType.style.backgroundColor = '#0f0f0f';  
    }


}

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

    regionSelect.addEventListener('change', function () {
        const selectedRegion = regionSelect.value;

        const filteredPokemons = Pokemon.pokemons.filter(pokemon => pokemon.region.name === selectedRegion);

        //console.log(selectedRegion)
        //console.log(Pokemon.pokemons[0].region.name)
        //console.log(filteredPokemons)

        const regionTable = `
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              ${filteredPokemons.map(pokemon => `
                <tr pokemon-name="${pokemon.name}">
                  <td>${pokemon.id}</td>
                  <td>${pokemon.name}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;

        const infoscreen = document.getElementById('infoscreen');
        infoscreen.innerHTML = regionTable;
        infoscreen.style.cursor = 'pointer';

        const tableCells = infoscreen.querySelectorAll('td, th');
        tableCells.forEach(cell => {
            cell.style.color = 'white';
        });

        const pokemonRows = infoscreen.querySelectorAll('tr[pokemon-name]');
        pokemonRows.forEach(row => {
            row.addEventListener('click', function () {
                const pokemonName = this.getAttribute('pokemon-name');
                const selectedPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokemonName);
                if (selectedPokemon) {
                    setPokemonScreen(selectedPokemon);
                }
            });
        });
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

    pokemonTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });
}

regionOptions();
typeOptions();
