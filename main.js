let allPokemon = [];

// Fetch Pokémon data from the API
async function fetchPokemonData() {
    try {
        const response = await fetch('http://localhost:3000/pokemon/all');
        allPokemon = await response.json();
        displayPokemon(allPokemon);
        addSearchListener();
        addSortingListeners();
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Display Pokémon in the table
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = '';

    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');

        createImageCell(pokemon, row);
        createTextCell(pokemon.pokedex_number || 'N/A', row);
        createNameCell(pokemon, row);
        createTextCell(pokemon.speed || 'N/A', row);
        createTextCell(pokemon.special_defence || 'N/A', row);
        createTextCell(pokemon.special_attack || 'N/A', row);
        createTextCell(pokemon.defence || 'N/A', row);
        createTextCell(pokemon.attack || 'N/A', row);
        createTextCell(pokemon.hp || 'N/A', row);
        createTypeCell(pokemon.primary_type || 'Unknown', row);
        createTypeCell(pokemon.secondary_type || 'Unknown', row);

        tableBody.appendChild(row);
    });
}

// Create a text cell
function createTextCell(content, row) {
    const cell = document.createElement('td');
    cell.textContent = content;
    row.appendChild(cell);
}

// Create an image cell
function createImageCell(pokemon, row) {
    const cell = document.createElement('td');
    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
    img.alt = pokemon.name;
    cell.appendChild(img);
    row.appendChild(cell);
}

// Create a name cell with a link
function createNameCell(pokemon, row) {
    const cell = document.createElement('td');
    const link = document.createElement('a');
    link.href = `pokemon-detail.html?id=${pokemon.pokedex_number}`;
    link.textContent = pokemon.name || 'Unknown';
    cell.appendChild(link);
    row.appendChild(cell);
}

// Create a type cell with styling
function createTypeCell(type, row) {
    const cell = document.createElement('td');
    if (type !== 'Unknown') {
        const typeButton = document.createElement('span');
        typeButton.textContent = type;
        typeButton.className = `type-button type-${type.toLowerCase()}`;
        cell.appendChild(typeButton);
    } else {
        cell.textContent = type;
    }
    row.appendChild(cell);
}

// Add search functionality
function addSearchListener() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', e => {
        const query = e.target.value.toLowerCase();
        const filteredPokemon = allPokemon.filter(pokemon =>
            pokemon.name.toLowerCase().includes(query) ||
            pokemon.primary_type.toLowerCase().includes(query) ||
            (pokemon.secondary_type && pokemon.secondary_type.toLowerCase().includes(query))
        );
        displayPokemon(filteredPokemon);
    });
}

// Add sorting functionality
function addSortingListeners() {
    const headers = document.querySelectorAll('#pokemon-table th[data-attribute]');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const attribute = header.getAttribute('data-attribute');
            const isAscending = header.classList.contains('ascending');
            headers.forEach(h => h.classList.remove('ascending', 'descending'));
            header.classList.toggle(isAscending ? 'descending' : 'ascending');

            allPokemon.sort((a, b) => {
                if (a[attribute] > b[attribute]) return isAscending ? -1 : 1;
                if (a[attribute] < b[attribute]) return isAscending ? 1 : -1;
                return 0;
            });

            displayPokemon(allPokemon);
        });
    });
}

// Fetch the Pokémon data
fetchPokemonData();