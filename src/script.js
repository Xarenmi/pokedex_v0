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

    const regionSelect = document.getElementById('region');



    const changeRegion = () => {

        let sortedPokemons = undefined;
        const selectedRegion = regionSelect.value;
        if (selectedRegion === 'all') {
            sortedPokemons = Pokemon.pokemons.slice().sort((a, b) => a.id - b.id);
        } else {
            const filteredPokemons = Pokemon.pokemons.filter(pokemon => pokemon.region.name === selectedRegion);
            sortedPokemons = filteredPokemons.slice().sort((a, b) => a.id - b.id);
        }

        let filteredRegion = Region.regions.filter(region => region.name === selectedRegion);

        const infoscreen = document.getElementById('infoscreen');

        let regionTable = '';
        if (filteredRegion[0]) {
            regionTable = `<h2>${selectedRegion}</h2>
        <p id ='Pokescription'>${filteredRegion[0].description}</p>`;
        }
        if (sortedPokemons.length > 0) {
            regionTable += `
        <table id="regionTable">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            ${sortedPokemons.map(pokemon => `
                <tr pokemon-name="${pokemon.name}" type="${pokemon.kind}" region="${pokemon.region}">
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
    }
    changeRegion();

    regionSelect.addEventListener('change', changeRegion);
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
        const selectedRegion = regionSelect.value;

        setRegionScreen(selectedRegion)

        arrowButtons();
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
            <table id="typeTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
            <tbody>
              ${sortedPokemons.map(pokemon => `
                <tr pokemon-name="${pokemon.name}" type="${pokemon.kind}" region="${pokemon.region}">
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
    const regionSelect = document.getElementById('region');
    const typeSelect = document.getElementById('type');
    const pokeDescription = document.getElementById('Pokescription');
    const infoscreen = document.getElementById('infoscreen');
    let pokemonRows = infoscreen.querySelectorAll('tr[pokemon-name]');
    let pokeList = Array.from(pokemonRows).map(row => row.getAttribute('pokemon-name'));
    let currentIndex = -1;

    const typeTable = document.getElementById('typeTable');
    const regionTable = document.getElementById('regionTable');

    typeSelect.addEventListener('change', function () {
        pokemonRows = infoscreen.querySelectorAll(`tr[pokemon-name][type="${typeSelect.value}"]`);
        pokeList = Array.from(pokemonRows).map(row => row.getAttribute('pokemon-name'));
        if (pokeList.length > 0) {
            currentIndex = 0;
        }
    });

    if (regionTable === null) {
        pokemonRows.forEach(row => {
            row.addEventListener('click', function () {
                currentIndex = pokeList.indexOf(this.getAttribute('pokemon-name'));
            });
        });

        prevButton.addEventListener('click', function () {

            if (currentIndex === 0) {
                prevButton.disabled = true;
            }
            if (currentIndex > 0) {
                prevButton.disabled = false;
                currentIndex--;
                const prevPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokeList[currentIndex]);
                setPokemonScreen(prevPokemon);
                pokeDescription.textContent = prevPokemon.description;
            }
        });

        nextButton.addEventListener('click', function () {
            if (currentIndex < pokeList.length - 1) {
                currentIndex++;
                const nextPokemon = Pokemon.pokemons.find(pokemon => pokemon.name === pokeList[currentIndex]);
                setPokemonScreen(nextPokemon);
                pokeDescription.textContent = nextPokemon.description;
            }
        });
    }

 /*    if (typeTable === null) {
        console.log(typeTable)

        const possibleValues = Array.from(regionSelect.options);
        let regionNames = possibleValues.map(region => region.value);
        const selectedRegion = Region.regions.filter(region => region.name === regionSelect.value);


        if (regionSelect.value !== 'all') {
            currentIndex = regionNames.indexOf(selectedRegion[0].name);
        }



        prevButton.addEventListener('click', function () {
            if (currentIndex > 1) {
                currentIndex--;
                regionSelect.value = regionNames[currentIndex];
                setRegionScreen(regionSelect.value);
                console.log(currentIndex, regionNames[currentIndex]);
            }
        });

        nextButton.addEventListener('click', function () {
            if (currentIndex < regionNames.length - 1) {
                currentIndex++;
                regionSelect.value = regionNames[currentIndex];
                setRegionScreen(regionSelect.value);
                console.log(currentIndex, regionNames[currentIndex]);
            }
        });
    } */
}

regionOptions();
typeOptions();

// Se repiten elementos en diferentes funciones para que no se puedan editar fuera de la funcion.


//MINOR BUG ALERT!! - Arrow buttons de tipo seleccionan regiones n_nU

