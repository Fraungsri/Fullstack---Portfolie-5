document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();

    // Add event listeners for dropdown changes
    document.getElementById('pokemon1').addEventListener('change', comparePokemonStats);
    document.getElementById('pokemon2').addEventListener('change', comparePokemonStats);
});

// Function to fetch Pokémon data and populate dropdowns
async function populateDropdowns() {
    try {
        const response = await fetch('http://localhost:3000/pokemon/all'); // Update URL if needed
        const pokemonList = await response.json();

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

        document.getElementById('pokemon-comparison').style.display = 'flex'; // Show comparison section
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

// Function to compare stats between two selected Pokémon
function comparePokemonStats() {
    const select1 = document.getElementById('pokemon1');
    const select2 = document.getElementById('pokemon2');

    if (!select1.value || !select2.value) return;

    const pokemon1Id = parseInt(select1.value, 10);
    const pokemon2Id = parseInt(select2.value, 10);

    fetch('http://localhost:3000/pokemon/all') // Update URL if needed
        .then(response => response.json())
        .then(pokemonList => {
            const pokemon1 = pokemonList.find(p => p.pokedex_number === pokemon1Id);
            const pokemon2 = pokemonList.find(p => p.pokedex_number === pokemon2Id);

            if (pokemon1 && pokemon2) {
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

                    const diffCell = document.createElement('td');
                    const difference = (pokemon1[stat] || 0) - (pokemon2[stat] || 0);
                    diffCell.textContent = difference;

                    if (difference > 0) diffCell.style.color = 'green';
                    else if (difference < 0) diffCell.style.color = 'red';
                    else diffCell.style.color = 'black';

                    row.appendChild(diffCell);
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching Pokémon stats:', error));
}

// Helper function to create a table cell
function createTextCell(content, row) {
    const cell = document.createElement('td');
    cell.textContent = content;
    row.appendChild(cell);
}