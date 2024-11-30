document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    if (!pokemonId) {
        document.body.innerHTML = '<h1>Error: Pokémon ID not found</h1>';
        return;
    }

    // Fetching pokemon details
    fetch(`http://localhost:3000/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then(pokemon => {
            // Update Header
            document.getElementById('pokemon-name').innerHTML = `${pokemon.name} <span>#${pokemon.pokedex_number}</span>`;

            // Update Image
            document.getElementById('pokemon-image').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_number}.png`;
            document.getElementById('pokemon-image').alt = pokemon.name;

            // Update Stats
            document.getElementById('pokedex-number').textContent = pokemon.pokedex_number;
            document.getElementById('hp').textContent = pokemon.hp;
            document.getElementById('attack').textContent = pokemon.attack;
            document.getElementById('defense').textContent = pokemon.defence;
            document.getElementById('speed').textContent = pokemon.speed;
            document.getElementById('special-attack').textContent = pokemon.special_attack;
            document.getElementById('special-defense').textContent = pokemon.special_defence;

            // Update Type Badges
            const typeContainer = document.getElementById('type-container');
            typeContainer.innerHTML = ''; // Clear existing types
            const primaryBadge = document.createElement('span');
            primaryBadge.className = `type-badge ${pokemon.primary_type.toLowerCase()}`;
            primaryBadge.textContent = pokemon.primary_type;
            typeContainer.appendChild(primaryBadge);

            if (pokemon.secondary_type) {
                const secondaryBadge = document.createElement('span');
                secondaryBadge.className = `type-badge ${pokemon.secondary_type.toLowerCase()}`;
                secondaryBadge.textContent = pokemon.secondary_type;
                typeContainer.appendChild(secondaryBadge);
            }
        })
        .catch(error => {
            console.error('Error fetching Pokémon:', error);
            document.body.innerHTML = `<h1>Error: ${error.message}</h1>`;
        });
});


// go back to front page button
document.getElementById('go-back-btn').addEventListener('click', () => {
    window.location.href = 'index.html';
});

