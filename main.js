// Fetch Pokémon data from the API
let allPokemon = [];

// Fetch Pokémon data from the API
fetch('http://localhost:3000/pokemon/all')
    .then(response => response.json())
    .then(data => {
        allPokemon = data; // Save data globally for searching
        displayPokemon(allPokemon);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display Pokémon data in a table
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = ''; // Clear the table before adding new rows

    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');
        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
        image.alt = pokemon.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell)

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
        const primaryTypeButton = document.createElement('button');
        primaryTypeButton.textContent = pokemon.primary_type;
        primaryTypeButton.classList.add('type-button', `type-${pokemon.primary_type.toLowerCase()}`);
        primaryTypeCell.appendChild(primaryTypeButton);

        // add secondary type
        const secondaryTypeCell = document.createElement('td');
        const secondaryTypeButton = document.createElement('button');
        secondaryTypeButton.textContent = pokemon.secondary_type;
        secondaryTypeButton.classList.add('type-button', `type-${pokemon.secondary_type.toLowerCase()}`);
        secondaryTypeCell.appendChild(secondaryTypeButton);

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

// Search function
document.getElementById('search').addEventListener('input', function (e) {
    const searchQuery = e.target.value.toLowerCase();

    // Filter Pokémon list based on name or type
    const filteredPokemon = allPokemon.filter(pokemon => {
        return (
            pokemon.name.toLowerCase().includes(searchQuery) ||
            (pokemon.primary_type && pokemon.primary_type.toLowerCase().includes(searchQuery)) ||
            (pokemon.secondary_type && pokemon.secondary_type.toLowerCase().includes(searchQuery))
        );
    });

    // Update the displayed Pokémon
    displayPokemon(filteredPokemon);
});

