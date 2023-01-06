const urlParams = new URLSearchParams(location.search);
const pokemonName = urlParams.get('name');

const pokemonNameCapitalized = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

document.title = pokemonNameCapitalized + ' - Pokedex'

const contentPokemon = document.getElementById('page'); 

function getPokemonDetails(pokemon) {
    pokeApi.getPokemon(pokemon).then((details) => {
        contentPokemon.innerHTML += `
        <section class="${details.types[0]}">
            <section class="box + ${details.types[0]}">
                <div class="navegation">
                    <a href="index.html"><i class="bi bi-arrow-left" style="font-size: 2rem; color: white;"></i></a>
                </div>
                <div class="content" id="content">
                <div class="pokemon">
                    <div class="head">
                        <div class="title">
                            <h1 class="name">${details.name}</h1>
                            <ol class="types">
                                ${details.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                        </div>
                        <span class="number">#${details.number}</span>
                    </div>
                    <div class="image">
                        <img src="${details.photo}" alt="Bulbasaur">
                    </div>
                </div>
                <div class="overview">
                    <h2>Overview</h2>
                    <ul class="infos">
                        <li class="info">
                            <label class="labels">Height:</label>
                            <label>${details.height/10}m</label>
                        </li>
                        <li class="info">
                            <label class="labels">Weight:</label>
                            <label>${details.weight/10}kg</label>
                        </li>
                        <li class="info">
                            <label class="labels">Abilities:</label>
                            <label>
                                <ol class="abilities">
                                    ${details.abilities.map((ability) => `<li class="ability">${ability}</li>`).join('')}
                                </ol>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="stats">
                    <h2>Stats</h2>
                    <ol class="all-stats">
                        <li class="stat">
                            <label class="labels">Hp:</label>
                            <label class="num">${details.stats.hp}</label>
                            <progress class="hp" value="${details.stats.hp}" max="255"></progress>
                        </li>
                        <li class="stat">
                            <label class="labels">Attack:</label>
                            <label class="num">${details.stats.attack}</label>
                            <progress class="hp" value="${details.stats.attack}" max="190"></progress>
                        </li>
                        <li class="stat">
                            <label class="labels">Defense:</label>
                            <label class="num">${details.stats.defense}</label>
                            <progress value="${details.stats.defense}" max="250"></progress>
                        </li>
                        <li class="stat">
                            <label class="labels">Special-Attack:</label>
                            <label class="num">${details.stats.specialAttack}</label>
                            <progress class="hp" value="${details.stats.specialAttack}" max="194"></progress>
                        </li>
                        <li class="stat">
                            <label class="labels">Special-Defense:</label>
                            <label class="num">${details.stats.specialDefense}</label>
                            <progress class="hp" value="${details.stats.specialDefense}" max="250"></progress>
                        </li>
                        <li class="stat">
                            <label class="labels">Speed:</label>
                            <label class="num">${details.stats.speed}</label>
                            <progress class="hp" value="${details.stats.speed}" max="200"></progress>
                        </li>
                    </ol>
                </div>
            </div>
            </section>
        </section>
        `
    })
}

getPokemonDetails(pokemonName);