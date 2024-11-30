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

fetchPokemonData();

// Function to display Pokémon data in the table
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
    link.classList.add('bold-text'); // Add the CSS class
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

// Function to sort and display the Pokémon table
let currentSort = { attribute: null, ascending: true };

function handleSort(event) {
    const attribute = event.target.getAttribute('data-attribute');

    if (!attribute) return;

    // Toggle sorting order
    if (currentSort.attribute === attribute) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.attribute = attribute;
        currentSort.ascending = true;
    }

    // Remove the ascending and descending classes from all headers
    const headers = document.querySelectorAll('#pokemon-table th[data-attribute]');
    headers.forEach(header => {
        header.classList.remove('ascending', 'descending');
    });

    // Add the appropriate class to the clicked header
    const clickedHeader = event.target;
    if (currentSort.ascending) {
        clickedHeader.classList.add('ascending');
    } else {
        clickedHeader.classList.add('descending');
    }

    // Sort the Pokémon array
    allPokemon.sort((a, b) => {
        let valA = a[attribute] || ''; // Use an empty string for undefined/null values
        let valB = b[attribute] || '';

        // Convert to lowercase for case-insensitive sorting (for text fields like name or type)
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return currentSort.ascending ? -1 : 1;
        if (valA > valB) return currentSort.ascending ? 1 : -1;
        return 0;
    });

    // Re-render the table
    displayPokemon(allPokemon);
}


// Add sorting event listeners to table headers
function addSortingListeners() {
    const headers = document.querySelectorAll('#pokemon-table th[data-attribute]');
    headers.forEach(header => {
        header.style.cursor = 'pointer'; // Make headers look clickable
        header.addEventListener('click', handleSort);
    });
}

// Fetch the Pokémon data
fetchPokemonData();