const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokeDetails) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetails.id;
    pokemon.name = pokeDetails.name;

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetails.sprites.other.home.front_default;

    pokemon.height = pokeDetails.height;
    pokemon.weight = pokeDetails.weight;
    
    const abilities = pokeDetails.abilities.map((ability) => ability.ability.name)
    pokemon.abilities = abilities;

    const pokemonStats = {
        hp: 0, 
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0
    }
    
    pokeDetails.stats.map((stats) => {

        switch (stats.stat.name) {
            case 'hp':
                pokemonStats.hp = stats.base_stat;
                break;
            case 'attack':
                pokemonStats.attack = stats.base_stat;
                break;
            case 'defense':
                pokemonStats.defense = stats.base_stat;
                break;
            case 'special-attack':
                pokemonStats.specialAttack = stats.base_stat;
                break;
            case 'special-defense':
                pokemonStats.specialDefense = stats.base_stat;
                break;
            case 'speed':
                pokemonStats.speed = stats.base_stat;
                break;
        }
    })

    pokemon.stats = pokemonStats;

    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 50) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailsRequests) => Promise.all(detailsRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon = (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => Promise.resolve(convertPokeApiDetailsToPokemon(pokemon)))
        .then((pokemonDetails) => pokemonDetails)
}
