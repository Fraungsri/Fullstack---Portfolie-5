// Fetch Pokémon data from the API
let allPokemon = [];

// Fetch Pokémon data from the API
fetch('http://localhost:3000/pokemon/all')
    .then(response => response.json())
    .then(data => {
        allPokemon = data; // Save data globally for searching
        displayPokemon(allPokemon);
        populateComparisonDropdowns(allPokemon); // Populate dropdowns for comparison
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display Pokémon data in a table
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = ''; // Clear the table before adding new rows

    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');

        // Add image cell
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
        image.alt = pokemon.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        // Add Pokedex Number
        const numberCell = document.createElement('td');
        numberCell.textContent = pokemon.pokedex_number;
        row.appendChild(numberCell);

        // Add Name
        const nameCell = document.createElement('td');
        nameCell.textContent = pokemon.name;
        row.appendChild(nameCell);

        // Add Speed
        const speedCell = document.createElement('td');
        speedCell.textContent = pokemon.speed;
        row.appendChild(speedCell);

        // Add Special Defence
        const specialDefenceCell = document.createElement('td');
        specialDefenceCell.textContent = pokemon.special_defence;
        row.appendChild(specialDefenceCell);

        // Add Special Attack
        const specialAttackCell = document.createElement('td');
        specialAttackCell.textContent = pokemon.special_attack;
        row.appendChild(specialAttackCell);

        // Add Defence
        const defenceCell = document.createElement('td');
        defenceCell.textContent = pokemon.defence;
        row.appendChild(defenceCell);

        // Add Attack
        const attackCell = document.createElement('td');
        attackCell.textContent = pokemon.attack;
        row.appendChild(attackCell);

        // Add HP
        const hpCell = document.createElement('td');
        hpCell.textContent = pokemon.hp;
        row.appendChild(hpCell);

        // Add Primary Type
        const primaryTypeCell = document.createElement('td');
        primaryTypeCell.textContent = pokemon.primary_type;
        row.appendChild(primaryTypeCell);

        // Add Secondary Type
        const secondaryTypeCell = document.createElement('td');
        secondaryTypeCell.textContent = pokemon.secondary_type || 'None'; // Handle null/undefined values
        row.appendChild(secondaryTypeCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });

}

// Function to populate the dropdowns with Pokémon names
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

    // Add event listeners for when the user selects a Pokémon
    select1.addEventListener('change', comparePokemonStats);
    select2.addEventListener('change', comparePokemonStats);
}

// Function to compare the stats of two Pokémon
function comparePokemonStats() {
    const pokemon1Id = document.getElementById('pokemon1').value;
    const pokemon2Id = document.getElementById('pokemon2').value;

    // Find the two Pokémon from the list
    const pokemon1 = allPokemon.find(p => p.pokedex_number == pokemon1Id);
    const pokemon2 = allPokemon.find(p => p.pokedex_number == pokemon2Id);

    if (pokemon1 && pokemon2) {
        // Compare stats and display results
        const comparisonResult = document.getElementById('comparison-result');
        let resultHTML = `
            <h3>Comparison: ${pokemon1.name} vs ${pokemon2.name}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Stat</th>
                        <th>${pokemon1.name}</th>
                        <th>${pokemon2.name}</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Attack</td><td>${pokemon1.attack}</td><td>${pokemon2.attack}</td><td>${pokemon1.attack - pokemon2.attack}</td></tr>
                    <tr><td>Speed</td><td>${pokemon1.speed}</td><td>${pokemon2.speed}</td><td>${pokemon1.speed - pokemon2.speed}</td></tr>
                    <tr><td>Defense</td><td>${pokemon1.defence}</td><td>${pokemon2.defence}</td><td>${pokemon1.defence - pokemon2.defence}</td></tr>
                    <tr><td>Special Attack</td><td>${pokemon1.special_attack}</td><td>${pokemon2.special_attack}</td><td>${pokemon1.special_attack - pokemon2.special_attack}</td></tr>
                    <tr><td>Special Defense</td><td>${pokemon1.special_defence}</td><td>${pokemon2.special_defence}</td><td>${pokemon1.special_defence - pokemon2.special_defence}</td></tr>
                    <tr><td>HP</td><td>${pokemon1.hp}</td><td>${pokemon2.hp}</td><td>${pokemon1.hp - pokemon2.hp}</td></tr>
                </tbody>
            </table>
        `;

        comparisonResult.innerHTML = resultHTML;
    }
}

// Search function (unchanged)
document.getElementById('search').addEventListener('input', function (e) {
    const searchQuery = e.target.value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(searchQuery) ||
            (pokemon.primary_type && pokemon.primary_type.toLowerCase().includes(searchQuery)) ||
            (pokemon.secondary_type && pokemon.secondary_type.toLowerCase().includes(searchQuery))
        );
    });
    displayPokemon(filteredPokemon);
});
