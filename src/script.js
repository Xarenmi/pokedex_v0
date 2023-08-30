import { Pokemon, Region } from './db.js';

function regionOptions() {
    const regionSelect = document.getElementById('region');
    regionSelect.innerHTML = ''; 

    const regionOption = document.createElement('option');
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

regionOptions();
Region.regions.forEach(region => { console.log(region.name)});
//document.getElementById('region').addEventListener('change', updateFilteredPokemon);