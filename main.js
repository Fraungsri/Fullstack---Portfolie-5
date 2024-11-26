// Initialize an array to store all Pokémon data
let allPokemon = [];

// Asynchronous function to fetch Pokémon data from the API
async function fetchPokemonData() {
    try {
        const response = await fetch('http://localhost:3000/pokemon/all');
        allPokemon = await response.json();
        displayPokemon(allPokemon);
        populateComparisonDropdowns(allPokemon);
        addEventListeners();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchPokemonData();

// Function to display Pokémon data in the table
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = '';

    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');

        // Create table cells for each Pokémon attribute
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
        createSecondaryTypeCell(pokemon.secondary_type, row);

        // Add the row to the table body
        tableBody.appendChild(row);
    });
}

// Helper function to create a text cell
function createTextCell(content, row) {
    const cell = document.createElement('td');
    cell.textContent = content;
    row.appendChild(cell);
}

// Helper function to create an image cell
function createImageCell(pokemon, row) {
    const cell = document.createElement('td');
    const image = document.createElement('img');
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
    image.alt = pokemon.name;
    cell.appendChild(image);
    row.appendChild(cell);
}

// Helper function to create a name cell with a link
function createNameCell(pokemon, row) {
    const cell = document.createElement('td');
    const link = document.createElement('a');
    link.href = `pokemon-detail.html?id=${pokemon.pokedex_number}`;
    link.textContent = pokemon.name || 'Unknown';
    cell.appendChild(link);
    row.appendChild(cell);
}

// Helper function to create a type cell
function createTypeCell(type, row) {
    const cell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = type;
    button.classList.add('type-button', `type-${type.toLowerCase()}`);
    cell.appendChild(button);
    row.appendChild(cell);
}

// Helper function to create a secondary type cell
function createSecondaryTypeCell(type, row) {
    const cell = document.createElement('td');
    if (type) {
        const button = document.createElement('button');
        button.textContent = type;
        button.classList.add('type-button', `type-${type.toLowerCase()}`);
        cell.appendChild(button);
    } else {
        cell.textContent = 'None';
    }
    row.appendChild(cell);
}

// Function to populate the comparison dropdowns with Pokémon names
function populateComparisonDropdowns(pokemonList) {
    const select1 = document.getElementById('pokemon1');
    const select2 = document.getElementById('pokemon2');

    pokemonList.forEach(pokemon => {
        const option1 = document.createElement('option');
        option1.value = pokemon.pokedex_number;
        option1.textContent = pokemon.name;
        select1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = pokemon.pokedex_number;
        option2.textContent = pokemon.name;
        select2.appendChild(option2);
    });
}

// Function to compare stats between two selected Pokémon
function comparePokemonStats() {
    const select1 = document.getElementById('pokemon1');
    const select2 = document.getElementById('pokemon2');

    // Ensure both Pokémon are selected
    if (!select1.value || !select2.value) return;

    const pokemon1Id = parseInt(select1.value, 10);
    const pokemon2Id = parseInt(select2.value, 10);

    const pokemon1 = allPokemon.find(p => p.pokedex_number === pokemon1Id);
    const pokemon2 = allPokemon.find(p => p.pokedex_number === pokemon2Id);

    if (pokemon1 && pokemon2) {
        // Update headers with Pokémon names
        document.getElementById('pokemon1-name').textContent = pokemon1.name;
        document.getElementById('pokemon2-name').textContent = pokemon2.name;

        document.getElementById('pokemon1-header').textContent = pokemon1.name;
        document.getElementById('pokemon2-header').textContent = pokemon2.name;

        const stats = ['attack', 'speed', 'defence', 'special_attack', 'special_defence', 'hp'];
        const statLabels = {
            'attack': 'Attack',
            'speed': 'Speed',
            'defence': 'Defense',
            'special_attack': 'Special Attack',
            'special_defence': 'Special Defense',
            'hp': 'HP'
        };

        const tbody = document.querySelector('#comparison-table tbody');
        tbody.innerHTML = '';

        stats.forEach(stat => {
            const row = document.createElement('tr');

            createTextCell(statLabels[stat], row);
            createTextCell(pokemon1[stat] || 'N/A', row);
            createTextCell(pokemon2[stat] || 'N/A', row);

            // Calculate and display the difference
            const diffCell = document.createElement('td');
            const difference = (pokemon1[stat] || 0) - (pokemon2[stat] || 0);
            diffCell.textContent = difference;

            // Color code the difference
            if (difference > 0) diffCell.style.color = 'green';
            else if (difference < 0) diffCell.style.color = 'red';
            else diffCell.style.color = 'black';

            row.appendChild(diffCell);
            tbody.appendChild(row);
        });
    }
}

// Search function to filter Pokémon based on input
function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(searchQuery) ||
            (pokemon.primary_type && pokemon.primary_type.toLowerCase().includes(searchQuery)) ||
            (pokemon.secondary_type && pokemon.secondary_type.toLowerCase().includes(searchQuery))
        );
    });
    displayPokemon(filteredPokemon);
}

// Function to add event listeners
function addEventListeners() {
    // Event listener for the search input
    document.getElementById('search').addEventListener('input', handleSearch);

    // Event listener for the comparison button
    document.getElementById('show-comparison-btn').addEventListener('click', () => {
        const comparisonSection = document.getElementById('pokemon-comparison');
        comparisonSection.style.transition = 'all 0.3s ease';
        if (comparisonSection.style.display === 'none' || comparisonSection.style.display === '') {
            comparisonSection.style.display = 'flex';
            comparisonSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            comparisonSection.style.display = 'none';
        }
    });

    // Event listeners for the comparison dropdowns
    document.getElementById('pokemon1').addEventListener('change', comparePokemonStats);
    document.getElementById('pokemon2').addEventListener('change', comparePokemonStats);
}