// Hent Pokémon-data fra API
let allPokemon = [];

// Fetch Pokémon data
fetch('http://localhost:3000/pokemon/all')
    .then(response => response.json())
    .then(data => {
        allPokemon = data;
        displayPokemon(allPokemon);
        populateComparisonDropdowns(allPokemon);
    })
    .catch(error => console.error('Error fetching data:', error));

// Funktion til at vise Pokémon-data i en tabel
function displayPokemon(pokemonList) {
    const tableBody = document.getElementById('pokemon-table-body');
    tableBody.innerHTML = '';

    pokemonList.forEach(pokemon => {
        const row = document.createElement('tr');


        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
        image.alt = pokemon.name;
        imageCell.appendChild(image);
        row.appendChild(imageCell);

        // Pokedex Nummer
        const numberCell = document.createElement('td');
        numberCell.textContent = pokemon.pokedex_number;
        row.appendChild(numberCell);

        // Navn + når navnene klikkes, så bliver man sendt til en på api endpoint som er (/pokemon/:id)
        const nameCell = document.createElement('td');
        const nameLink = document.createElement('a');
        nameLink.href = `pokemon-detail.html?id=${pokemon.pokedex_number}`; // Dynamic link
        nameLink.textContent = pokemon.name;
        nameCell.appendChild(nameLink);
        row.appendChild(nameCell);

        // Fart
        const speedCell = document.createElement('td');
        speedCell.textContent = pokemon.speed;
        row.appendChild(speedCell);

        // Special Forsvar
        const specialDefenceCell = document.createElement('td');
        specialDefenceCell.textContent = pokemon.special_defence;
        row.appendChild(specialDefenceCell);

        // Special Angreb
        const specialAttackCell = document.createElement('td');
        specialAttackCell.textContent = pokemon.special_attack;
        row.appendChild(specialAttackCell);

        // Forsvar
        const defenceCell = document.createElement('td');
        defenceCell.textContent = pokemon.defence;
        row.appendChild(defenceCell);

        // Angreb
        const attackCell = document.createElement('td');
        attackCell.textContent = pokemon.attack;
        row.appendChild(attackCell);

        // Livspoint
        const hpCell = document.createElement('td');
        hpCell.textContent = pokemon.hp;
        row.appendChild(hpCell);

        // Primær Type med knap
        const primaryTypeCell = document.createElement('td');
        const primaryTypeButton = document.createElement('button');
        primaryTypeButton.textContent = pokemon.primary_type; // Typenavn
        primaryTypeButton.classList.add('type-button', `type-${pokemon.primary_type.toLowerCase()}`); // Dynamisk typeklasse
        primaryTypeCell.appendChild(primaryTypeButton); // Tilføj knap til celle
        row.appendChild(primaryTypeCell);

        // Sekundær Type med knap
        const secondaryTypeCell = document.createElement('td');
        if (pokemon.secondary_type) {
            const secondaryTypeButton = document.createElement('button');
            secondaryTypeButton.textContent = pokemon.secondary_type;
            secondaryTypeButton.classList.add('type-button', `type-${pokemon.secondary_type.toLowerCase()}`); // Dynamisk typeklasse
            secondaryTypeCell.appendChild(secondaryTypeButton);
        } else {
            secondaryTypeCell.textContent = 'Ingen'; // Fallback for manglende sekundær type
        }
        row.appendChild(secondaryTypeCell);

        // Tilføj rækken til tabelkroppen
        tableBody.appendChild(row);
    });
}

// Funktion til at udfylde dropdowns med Pokémon-navne
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

    // Tilføj event listeners for når brugeren vælger en Pokémon
    select1.addEventListener('change', comparePokemonStats);
    select2.addEventListener('change', comparePokemonStats);
}

// Funktion til at sammenligne stats af to Pokémon
function comparePokemonStats() {
    const pokemon1Id = document.getElementById('pokemon1').value;
    const pokemon2Id = document.getElementById('pokemon2').value;

    // Find de to Pokémon fra listen
    const pokemon1 = allPokemon.find(p => p.pokedex_number == pokemon1Id);
    const pokemon2 = allPokemon.find(p => p.pokedex_number == pokemon2Id);

    if (pokemon1 && pokemon2) {
        // Opdater navne i headeren
        document.getElementById('pokemon1-name').textContent = pokemon1.name;
        document.getElementById('pokemon2-name').textContent = pokemon2.name;

        // Opdater kolonneoverskrifter i tabellen
        document.getElementById('pokemon1-header').textContent = pokemon1.name;
        document.getElementById('pokemon2-header').textContent = pokemon2.name;

        // Sammenlign stats og opdater tabellen
        const stats = ['attack', 'speed', 'defence', 'special_attack', 'special_defence', 'hp'];
        const statLabels = {
            'attack': 'Angreb',
            'speed': 'Fart',
            'defence': 'Forsvar',
            'special_attack': 'Special Angreb',
            'special_defence': 'Special Forsvar',
            'hp': 'Livspoint'
        };
        const tbody = document.querySelector('#comparison-table tbody');
        tbody.innerHTML = ''; // Ryd tidligere data

        stats.forEach(stat => {
            const row = document.createElement('tr');

            const statCell = document.createElement('td');
            statCell.textContent = statLabels[stat];
            row.appendChild(statCell);

            const pokemon1Cell = document.createElement('td');
            pokemon1Cell.textContent = pokemon1[stat];
            row.appendChild(pokemon1Cell);

            const pokemon2Cell = document.createElement('td');
            pokemon2Cell.textContent = pokemon2[stat];
            row.appendChild(pokemon2Cell);

            const diffCell = document.createElement('td');
            const difference = pokemon1[stat] - pokemon2[stat];
            diffCell.textContent = difference;

            // Tilføj farveindikator for forskellen
            if (difference > 0) {
                diffCell.style.color = 'green';
            } else if (difference < 0) {
                diffCell.style.color = 'red';
            } else {
                diffCell.style.color = 'black';
            }

            row.appendChild(diffCell);

            tbody.appendChild(row);
        });
    }
}

// Søgefunktion
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

// Skjul eller vis sammenligningssektionen
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

d
