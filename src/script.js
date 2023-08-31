import { Pokemon, Region } from './db.js';

function setPokemonScreen(pokemon) {
    const photoElement = document.getElementById('pokepic');
    const photoPath = `./src/img/${pokemon.name}.png`;
    photoElement.src = photoPath;

    const healthInfo = document.getElementById('health');
    healthInfo.innerText = `Altura: ${pokemon.height}    -    Peso: ${pokemon.weight}`

    const thisRegion = document.getElementById('dis-reg');
    thisRegion.innerText = `${pokemon.region.name}`.toUpperCase();
    thisRegion.style.backgroundColor = '#0f0f0f';
    thisRegion.classList.remove('hidden');

    const thisType = document.getElementById('dis-type');
    thisType.innerText = `${pokemon.kind}`.toUpperCase();
    thisType.classList.remove('hidden');

    switch (pokemon.kind) {
        case 'Planta':
            thisType.style.backgroundColor = '#0d8448';
            thisType.style.color = '#fff';
            break;
        case 'Eléctrico':
            thisType.style.backgroundColor = '#e9af00';
            thisType.style.color = '#fff';
            break;
        case 'Fantasma':
            thisType.style.backgroundColor = '#9400e9';
            thisType.style.color = '#fff';
            break;
        case 'Agua':
            thisType.style.backgroundColor = '#0084e9';
            thisType.style.color = '#fff';
            break;
        case 'Hielo':
            thisType.style.backgroundColor = '#8dbde2';
            thisType.style.color = '#0f0f0f';
            break;
        case 'Hada':
            thisType.style.backgroundColor = '#e332c0';
            thisType.style.color = '#fff';
            break;
        case 'Hierro':
            thisType.style.backgroundColor = '#333f50';
            thisType.style.color = '#fff';
            break;
        default:
            thisType.style.backgroundColor = '#0f0f0f';
            thisType.style.color = '#fff';
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
        let sortedPokemons = undefined;
        const selectedRegion = regionSelect.value;
        if (selectedRegion === 'all') {
            sortedPokemons = Pokemon.pokemons.slice().sort((a, b) => a.id - b.id);
        } else {
            const filteredPokemons = Pokemon.pokemons.filter(pokemon => pokemon.region.name === selectedRegion);
            sortedPokemons = filteredPokemons.slice().sort((a, b) => a.id - b.id);
        }

        //console.log(selectedRegion)
        //console.log(Pokemon.pokemons[0].region.name)
        //console.log(filteredPokemons)

        let regionTable = '';
        if (sortedPokemons.length > 0) {
            regionTable = `
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              ${sortedPokemons.map(pokemon => `
                <tr pokemon-name="${pokemon.name}">
                  <td>${pokemon.id}</td>
                  <td>${pokemon.name}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        } else {
            regionTable = 'Aún no almacenamos Pokemon de esa categoría.'
        }

        const infoscreen = document.getElementById('infoscreen');
        infoscreen.innerHTML = regionTable;
        infoscreen.style.cursor = 'pointer';

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

    typeSelect.addEventListener('change', function () {
        let sortedPokemons = undefined;
        const selectedType = typeSelect.value;
        if (selectedType === 'all') {
            sortedPokemons = Pokemon.pokemons.slice().sort((a, b) => a.id - b.id);
        } else {
            const filteredPokemons = Pokemon.pokemons.filter(pokemon => pokemon.kind === selectedType);
            sortedPokemons = filteredPokemons.slice().sort((a, b) => a.id - b.id);
        }

        let typeTable = '';
        if (sortedPokemons.length > 0) {
            typeTable = `
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              ${sortedPokemons.map(pokemon => `
                <tr pokemon-name="${pokemon.name}">
                  <td>${pokemon.id}</td>
                  <td>${pokemon.name}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
        } else {
            typeTable = 'Aún no almacenamos Pokemon de esa categoría.'
        }


        const infoscreen = document.getElementById('infoscreen');
        infoscreen.innerHTML = typeTable;
        infoscreen.style.cursor = 'pointer';

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

regionOptions();
typeOptions();
