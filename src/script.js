import { Pokemon, Region } from './db.js';

let fromSelector = null;
let thisPokemon = null;

// info screen
function setInfoScreen() {
    const infoscreen = document.getElementById('infoscreen');
    const allPokemons = Pokemon.getPokemons();
    let sorted = [];

    if (fromSelector === 'Todos') {
        sorted = allPokemons.slice().sort((a, b) => a.id - b.id);
        if (thisPokemon === null || thisPokemon === undefined) {
            thisPokemon = sorted[0];
        }
        infoscreen.innerHTML = `<h2>Todos los pokemon:</h2>
        <h3 class="yellow-text">${thisPokemon.name}</h3>
        <p>${thisPokemon.description}</p>`;
        setPhotoScreen();
    }

    if (fromSelector === 'Select') {
        setPhotoScreen();
        infoscreen.innerHTML = `<p>¡Bienvenido al Pokedex! <br>
        Selecciona el tipo o región para filtrar los Pokemon.</p>`;
    }

    let thisType = allPokemons.filter(pokemon => pokemon.kind === fromSelector);
    let thisRegion = Region.findRegion(fromSelector)
    let filteredPokemons = allPokemons.filter(pokemon => pokemon.region === thisRegion)

    if (thisType.length > 0) {
        sorted = thisType.slice().sort((a, b) => a.id - b.id);
        if (thisPokemon === null) {
            thisPokemon = sorted[0];
        }
        infoscreen.innerHTML = `<h2>${thisPokemon.kind}</h2>
        <h3 class="yellow-text">${thisPokemon.name}</h3>
        <p>${thisPokemon.description}</p>`;
        setPhotoScreen()
    } else if (thisRegion && thisPokemon) {
        infoscreen.innerHTML = `<h2>${thisRegion.name}</h2>
        <h3 class="yellow-text">${thisPokemon.name}</h3>
        <p>${thisPokemon.description}</p>`;
        setPhotoScreen()
        sorted = filteredPokemons.slice().sort((a, b) => a.id - b.id);
    } else if (thisRegion) {
        infoscreen.innerHTML = `<h2>${thisRegion.name}</h2>
        <h3 class="yellow-text"> </h3>
        <p>${thisRegion.description}</p>`;
        setPhotoScreen()
        sorted = filteredPokemons.slice().sort((a, b) => a.id - b.id);
    }

    let pokeTable = '';

    if (sorted.length > 0) {
        pokeTable = `
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            ${sorted.map(pokemon => `
                <tr pokemon-name="${pokemon.name}">
                <td>${pokemon.id}</td>
                <td>${pokemon.name}</td>
                </tr>
            `).join('')}
            </tbody>
        </table>
        `;
    } else if (fromSelector === 'Select') {
        pokeTable = '';
    } else {
        pokeTable = '<p class="yellow-text">Aún no almacenamos Pokemon de esa categoría.</p>';
    }

    infoscreen.innerHTML += pokeTable;
    infoscreen.style.cursor = 'pointer';

    const title = infoscreen.querySelector('h3');
    const description = infoscreen.querySelector('p');
    const pokemonRows = infoscreen.querySelectorAll('tr[pokemon-name]');

    pokemonRows.forEach(row => {
        row.addEventListener('click', function () {
            const pokemonName = this.getAttribute('pokemon-name');
            thisPokemon = Pokemon.findPokemon(pokemonName);
            setPhotoScreen(pokemonName);
            title.innerText = `${thisPokemon.name}`;
            description.innerText = `${thisPokemon.description}`;
        });
    });
}

// photo screen
function setPhotoScreen() {
    let thisRegion = Region.findRegion(fromSelector)
    const photoElement = document.getElementById('pokepic');
    const healthInfo = document.getElementById('health');
    const pokeRegion = document.getElementById('dis-reg');
    const pokeType = document.getElementById('dis-type');

    if (thisPokemon) {
        photoElement.style.height = '200px';
        photoElement.style.width = 'auto';
        photoElement.src = thisPokemon.pic;

        healthInfo.innerText = `Altura: ${thisPokemon.height}    -    Peso: ${thisPokemon.weight}`
        pokeRegion.innerText = `${thisPokemon.region.name}`.toUpperCase();

        pokeRegion.style.backgroundColor = '#0f0f0f';
        if (pokeRegion.classList.contains('hidden')) {
            pokeRegion.classList.remove('hidden');
        }

        pokeType.innerText = `${thisPokemon.kind}`.toUpperCase();
        if (pokeType.classList.contains('hidden')) {
            pokeType.classList.remove('hidden');
        }

        switch (thisPokemon.kind) {
            case 'Planta':
                pokeType.style.backgroundColor = '#0d8448';
                pokeType.style.color = '#fff';
                break;
            case 'Eléctrico':
                pokeType.style.backgroundColor = '#e9af00';
                pokeType.style.color = '#fff';
                break;
            case 'Fantasma':
                pokeType.style.backgroundColor = '#9400e9';
                pokeType.style.color = '#fff';
                break;
            case 'Agua':
                pokeType.style.backgroundColor = '#0084e9';
                pokeType.style.color = '#fff';
                break;
            case 'Hielo':
                pokeType.style.backgroundColor = '#8dbde2';
                pokeType.style.color = '#0f0f0f';
                break;
            case 'Hada':
                pokeType.style.backgroundColor = '#e332c0';
                pokeType.style.color = '#fff';
                break;
            case 'Hierro':
                pokeType.style.backgroundColor = '#333f50';
                pokeType.style.color = '#fff';
                break;
            default:
                pokeType.style.backgroundColor = '#0f0f0f';
                pokeType.style.color = '#fff';
        }
    } else {

        if (!pokeRegion.classList.contains('hidden')) {
            pokeRegion.classList.add('hidden');
        }

        if (!pokeType.classList.contains('hidden')) {
            pokeType.classList.add('hidden');
        }

        if (thisRegion) {
            photoElement.src = thisRegion.map;
            photoElement.style.height = '100%';
            photoElement.style.width = '100%';
            healthInfo.innerText = ' ';
        } else {
            photoElement.style.height = '200px';
            photoElement.style.width = 'auto';
            photoElement.src = './src/img/Pokebola.png';
            healthInfo.innerText = 'POKEDEX';
        }

    }
}

// set type options
function typeOptions() {
    const typeSelect = document.getElementById('type');
    typeSelect.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'Todos';
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
        let thisType = Pokemon.pokemons.filter(pokemon => pokemon.kind === typeSelect.value);
        let sorted = thisType.slice().sort((a, b) => a.id - b.id);
        thisPokemon = sorted[0];
        const regionSelect = document.getElementById('region');
        regionSelect.value = 'Select';

        const selectedType = typeSelect.value;
        fromSelector = selectedType;
        setInfoScreen()
    });
}

// set region options
function regionOptions() {
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = '';

    const allOption = document.createElement('option');
    allOption.value = 'Select';
    allOption.textContent = 'Select';
    regionSelect.appendChild(allOption);

    Region.regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.name;
        option.textContent = region.name;
        regionSelect.appendChild(option);
    });

    regionSelect.addEventListener('change', function () {
        thisPokemon = null;
        const typeSelect = document.getElementById('type');
        typeSelect.value = 'Todos';
        const selectedRegion = regionSelect.value;
        fromSelector = selectedRegion;
        setInfoScreen()
    });
}

const getItems = () => {
    const infoscreen = document.getElementById('infoscreen');
    const rows = infoscreen.querySelectorAll('tr[pokemon-name]');
    let pokeList = Array.from(rows).map(row => row.getAttribute('pokemon-name'));

    const selector = document.getElementById('region');
    const options = Array.from(selector.options);
    const regionNames = options.map(option => option.value);

    return [pokeList, regionNames];
}


function setArrows() {

    const prevButton = document.getElementById('dis-prev');
    const nextButton = document.getElementById('dis-next');
    const selector = document.getElementById('region');
    let currentIndex = -1;

    prevButton.addEventListener('click', function () {
        let thisRegion = Region.findRegion(fromSelector);
        let pokeList = getItems()[0];
        let regionNames = getItems()[1];

        if (thisPokemon === null && thisRegion === null) {
            currentIndex = -1;
        } else if (thisPokemon === null) {
            currentIndex = regionNames.indexOf(thisRegion.name);
        } else {
            currentIndex = pokeList.indexOf(thisPokemon.name);
        }

        if (currentIndex < 1) {
            prevButton.disabled = true;
        } else {
            prevButton.disabled = false;

            if (thisPokemon === null) {
                if (currentIndex <= 1) {
                    prevButton.disabled = true;
                } else {
                    prevButton.disabled = false;
                    fromSelector = regionNames[currentIndex - 1];
                    thisRegion = Region.findRegion(fromSelector);
                    currentIndex = regionNames.indexOf(thisRegion.name);
                    selector.value = fromSelector;
                    setInfoScreen();
                }
            }

            if (thisRegion === null) {
                let nextIndex = pokeList.indexOf(thisPokemon.name);
                currentIndex = nextIndex - 1;
                thisPokemon = Pokemon.findPokemon(pokeList[currentIndex]);
                setInfoScreen();
            }

            if (thisRegion !== null && thisPokemon !== null) {
                let nextIndex = pokeList.indexOf(thisPokemon.name);
                currentIndex = nextIndex - 1;
                thisPokemon = Pokemon.findPokemon(pokeList[currentIndex]);
                setInfoScreen();
            }
        }
    });

    nextButton.addEventListener('click', function () {
        let thisRegion = Region.findRegion(fromSelector);
        let pokeList = getItems()[0];
        let regionNames = getItems()[1];

        if (thisPokemon === null && thisRegion === null) {
            currentIndex = 0;
            fromSelector = regionNames[currentIndex];
            selector.value = fromSelector;
        } else if (thisPokemon === null) {
            currentIndex = regionNames.indexOf(thisRegion.name);
        } else {
            currentIndex = pokeList.indexOf(thisPokemon.name);
        }

        if (thisPokemon === null && currentIndex < regionNames.length - 1) {
            fromSelector = regionNames[currentIndex + 1];
            thisRegion = Region.findRegion(fromSelector);
            selector.value = fromSelector;
            currentIndex = regionNames.indexOf(thisRegion.name);
            setInfoScreen();
        }

        if (thisRegion === null && currentIndex < pokeList.length - 1) {
            let prevIndex = pokeList.indexOf(thisPokemon.name);
            currentIndex = prevIndex + 1;
            thisPokemon = Pokemon.findPokemon(pokeList[currentIndex]);
            setInfoScreen();
        }

        if (thisRegion !== null && thisPokemon !== null && currentIndex < pokeList.length - 1) {
            let prevIndex = pokeList.indexOf(thisPokemon.name);
            currentIndex = prevIndex + 1;
            thisPokemon = Pokemon.findPokemon(pokeList[currentIndex]);
            setInfoScreen();
        }

    });

    /* nextButton.addEventListener('click', function () {
              if (currentIndex < pokeList.length - 1) {
                  currentIndex++;
                  thisPokemon = Pokemon.findPokemon(pokeList[currentIndex]);
                  console.log(thisPokemon);
                  setInfoScreen();
              } */

}

regionOptions();
typeOptions();
setArrows();

//hover tag on arrow buttons 