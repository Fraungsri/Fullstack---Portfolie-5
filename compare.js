document.addEventListener('DOMContentLoaded', () => {
    // Initialiser dropdown-menuerne
    populateDropdowns();

    document.getElementById('compare-btn').addEventListener('click', () => {
        const select1 = document.getElementById('pokemon1').value;
        const select2 = document.getElementById('pokemon2').value;

        if (select1 && select2) {
            updatePokemonInfo();
            comparePokemonStats();
            document.getElementById('comparison-table').style.display = 'table';
        } else {
            alert('Please select two Pokémon to compare.');
        }
    });
});

async function populateDropdowns() {
    try {
        const response = await fetch('http://localhost:3000/pokemon/all');
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
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function updatePokemonInfo() {
    const select1 = document.getElementById('pokemon1');
    const select2 = document.getElementById('pokemon2');

    if (select1.value) {
        document.getElementById('pokemon1Image').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${select1.value}.png`;
    }

    if (select2.value) {
        document.getElementById('pokemon2Image').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${select2.value}.png`;
    }
}

function comparePokemonStats() {
    const select1 = document.getElementById('pokemon1').value;
    const select2 = document.getElementById('pokemon2').value;

    fetch('http://localhost:3000/pokemon/all')
        .then(response => response.json())
        .then(pokemonList => {
            const pokemon1 = pokemonList.find(p => p.pokedex_number == select1);
            const pokemon2 = pokemonList.find(p => p.pokedex_number == select2);

            if (pokemon1 && pokemon2) {
                const stats = ['attack', 'speed', 'defence', 'special_attack', 'special_defence', 'hp'];
                const tbody = document.querySelector('#comparison-table tbody');
                tbody.innerHTML = '';

                stats.forEach(stat => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${stat}</td>
                        <td>${pokemon1[stat]}</td>
                        <td>${pokemon2[stat]}</td>
                        <td style="color: ${pokemon1[stat] > pokemon2[stat] ? 'green' : 'red'};">
                            ${pokemon1[stat] - pokemon2[stat]}
                        </td>`;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error fetching Pokémon stats:', error));
}