async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

        // Check if the input is empty
        if (!pokemonName) {
            alert("Please enter a Pokémon name.");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        displayPokemonData(data); // Display the data on the webpage
    } catch (error) {
        console.error(error);
        document.getElementById("pokemonData").innerHTML = `
            <div class="card">
                <p style="color: red;">Error: ${error.message}</p>
            </div>
        `;
    }
}

function displayPokemonData(data) {
    const pokemonDataDiv = document.getElementById("pokemonData");

    // Clear previous data
    pokemonDataDiv.innerHTML = "";

    // Create a card to display the Pokémon data
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name.toUpperCase()}</h2>
        <p>Height: ${data.height}</p>
        <p>Weight: ${data.weight}</p>
        <p>Abilities:</p>
        <ul>
            ${data.abilities.map(ability => `<li>${ability.ability.name}</li>`).join("")}
        </ul>
    `;

    // Append the card to the container
    pokemonDataDiv.appendChild(card);
}