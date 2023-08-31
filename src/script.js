import { Pokemon, Region } from './db.js';

function setPokemonScreen(pokemon) {
    const photoElement = document.getElementById('pokepic');
    photoElement.style.height = '200px';

    const pokeDescription = document.getElementById('Pokescription');
    const pokeName = document.querySelector('h2');
    pokeName.innerHTML = `${pokemon.name}`
    pokeDescription.innerText = `${pokemon.description}`

    const photoPath = `./src/img/${pokemon.name}.png`;
    photoElement.src = photoPath;

    const healthInfo = document.getElementById('health');
    healthInfo.innerText = `Altura: ${pokemon.height}    -    Peso: ${pokemon.weight}`

    const thisRegion = document.getElementById('dis-reg');
    thisRegion.innerText = `${pokemon.region.name}`.toUpperCase();
    thisRegion.style.backgroundColor = '#0f0f0f';
    if (thisRegion.classList.contains('hidden')) {
        thisRegion.classList.remove('hidden');
    }

    const thisType = document.getElementById('dis-type');
    thisType.innerText = `${pokemon.kind}`.toUpperCase();
    if (thisType.classList.contains('hidden')) {
        thisType.classList.remove('hidden');
    }

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

function setRegionScreen(selectedRegion) {

    const thisRegion = document.getElementById('dis-reg');
    if (!thisRegion.classList.contains('hidden')) {
        thisRegion.classList.add('hidden');
    }

    const thisType = document.getElementById('dis-type');
    if (!thisType.classList.contains('hidden')) {
        thisType.classList.add('hidden');
    }

    const healthInfo = document.getElementById('health');
    const photoElement = document.getElementById('pokepic');
    const regionExist = Region.regions.filter(region => region.name === selectedRegion);
    let photoPath = ''

    if (regionExist.length > 0) {
        photoPath = `./src/img/${regionExist[0].name}.png`;
        photoElement.style.height = '280px';
        healthInfo.innerText = ' ';
    } else {
        photoElement.style.height = '200px';
        photoPath = './src/img/Pokebola.png';
        healthInfo.innerText = 'POKEDEX';
    }
    photoElement.src = photoPath;
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
        const typeSelect = document.getElementById('type');
        typeSelect.value = 'all';

        let sortedPokemons = undefined;
        const selectedRegion = regionSelect.value;
        if (selectedRegion === 'all') {
            sortedPokemons = Pokemon.pokemons.slice().sort((a, b) => a.id - b.id);
        } else {
            const filteredPokemons = Pokemon.pokemons.filter(pokemon => pokemon.region.name === selectedRegion);
            sortedPokemons = filteredPokemons.slice().sort((a, b) => a.id - b.id);
        }

        setRegionScreen(selectedRegion)

        //console.log(selectedRegion)
        //console.log(Pokemon.pokemons[0].region.name)
        //console.log(filteredPokemons)

        const infoscreen = document.getElementById('infoscreen');

        let filteredRegion = Region.regions.filter(region => region.name === selectedRegion);

        let regionTable = '';
        if (filteredRegion[0]) {
            regionTable = `<h2>${selectedRegion}</h2>
            <p id ='Pokescription'>${filteredRegion[0].description}</p>`;
        }
        if (sortedPokemons.length > 0) {
            regionTable += `
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
            regionTable += '<p class="yellow-text">Aún no almacenamos Pokemon de esa categoría.</p>'
        }


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
        const regionSelect = document.getElementById('region');
        regionSelect.value = 'all';

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
            <h2></h2>
            <p id='Pokescription'> </p>
            <table id="filteredPokemons">
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
        let pokemonName = pokemonRows[0].getAttribute('pokemon-name');
        let selectedPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokemonName);
        setPokemonScreen(selectedPokemon);

        pokemonRows.forEach(row => {
            row.addEventListener('click', function () {
                pokemonName = this.getAttribute('pokemon-name');
                selectedPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokemonName);
                if (selectedPokemon) {
                    setPokemonScreen(selectedPokemon);
                }
            });
            arrowButtons();
        });
    });
}

function arrowButtons() {
    const prevButton = document.getElementById('dis-prev');
    const nextButton = document.getElementById('dis-next');
    const pokeDescription = document.getElementById('Pokescription');
    const infoscreen = document.getElementById('infoscreen');
    const pokemonRows = infoscreen.querySelectorAll('tr[pokemon-name]');
    const pokeList = Array.from(pokemonRows).map(row => row.getAttribute('pokemon-name'));
    let currentIndex = -1;

    pokemonRows.forEach(row => {
        row.addEventListener('click', function () {
            currentIndex = pokeList.indexOf(this.getAttribute('pokemon-name'));
            const clickedPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokeList[currentIndex]);
            pokemonRows.forEach(row => row.classList.remove('selected'));
            row.classList.add('selected');
        });
    });

    prevButton.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            const prevPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokeList[currentIndex]);
            setPokemonScreen(prevPokemon);
            pokeDescription.textContent = prevPokemon.description;
            pokemonRows.forEach(row => row.classList.remove('selected'));
            const selectedRow = document.querySelector(`tr[pokemon-name="${prevPokemon.name}"]`);
            selectedRow.classList.add('selected');
        }
    });

    nextButton.addEventListener('click', function () {
        if (currentIndex < pokeList.length - 1) {
            currentIndex++;
            const nextPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokeList[currentIndex]);
            setPokemonScreen(nextPokemon);
            pokeDescription.textContent = nextPokemon.description;
            pokemonRows.forEach(row => row.classList.remove('selected'));
            const selectedRow = document.querySelector(`tr[pokemon-name="${nextPokemon.name}"]`);
            selectedRow.classList.add('selected');
        }
    });
}

regionOptions();
typeOptions();
// Se repiten elementos en diferentes funciones para que no se puedan editar fuera de la funcion.

