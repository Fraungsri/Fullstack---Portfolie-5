
// Fetch Pokémon data from the API
fetch('http://localhost:3000/pokemon/all')
    .then(response => response.json())
    .then(data => {
        displayPokemon(data);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display Pokémon data in a table
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');

    pokemonList.forEach(pokemon => {
        // Create a row for each Pokémon
        const row = document.createElement('tr');

        // add pokedex_number
        const pokedexCell = document.createElement('td');
        pokedexCell.textContent = pokemon.pokedex_number;

        // Add Pokémon name
        const nameCell = document.createElement('td');
        nameCell.textContent = pokemon.name;

        // add speed
        const speedCell = document.createElement('td');
        speedCell.textContent = pokemon.speed;

        // add special_defence
        const specialDefenceCell = document.createElement('td');
        specialDefenceCell.textContent = pokemon.special_defence;

        //add special_attack
        const specialAttackCell = document.createElement('td');
        specialAttackCell.textContent = pokemon.special_attack;

        //add defence
        const defenceCell = document.createElement('td');
        defenceCell.textContent = pokemon.defence;

        // add attack
        const attackCell = document.createElement('td');
        attackCell.textContent = pokemon.attack;

        // add hp
        const healthCell = document.createElement('td');
        healthCell.textContent = pokemon.hp

        // Add Pokémon primary type
        const primaryTypeCell = document.createElement('td');
        primaryTypeCell.textContent = pokemon.primary_type;

        // add secondary type
        const secondaryTypeCell = document.createElement('td');
        if (pokemon.secondary_type !== "null") {
            secondaryTypeCell.textContent = pokemon.secondary_type;
        } else {
            secondaryTypeCell.textContent = '';
        }

        // Append cells to the row
        row.appendChild(pokedexCell);
        row.appendChild(nameCell);
        row.appendChild(speedCell);
        row.appendChild(specialDefenceCell);
        row.appendChild(specialAttackCell);
        row.appendChild(defenceCell);
        row.appendChild(attackCell);
        row.appendChild(healthCell);
        row.appendChild(primaryTypeCell);
        row.appendChild(secondaryTypeCell);

        // Append row to the table body
        tableBody.appendChild(row);
    });
}




