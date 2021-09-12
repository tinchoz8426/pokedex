//Declaro todas las variables que voy a necesitar y apunto a los data- en el html
const pokeCard = document.querySelector("[data-poke-card]");
const pokeName = document.querySelector("[data-poke-name]");
const pokeImage = document.querySelector("[data-poke-image]");
const pokeImageContainer = document.querySelector("[data-poke-image-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");
const form = document.getElementById("form");

//Aca hago el fetch y si hay un error, por ejemplo se ingresa un texto o numero que no existe hago un catch y llamo a la funcion renderNotFound(), esta en la linea 59.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value } = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(error => renderNotFound())
})

//Funcion llamada por el then, lo que hace es guardar en una constante sprite el png front_default, que trae de la API, despues las constantes stats y types hago desestructuracion (lo vimos ayer en el after y lo investigue un poquito).
const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data
    //console.log(data); //prueba

    pokeName.textContent = data.name; //Trae el nombre del pokemon de la API y le hago escribo en el DOM, lo mismo para las lineas de abajo
    pokeImage.setAttribute('src', sprite);
    pokeId.textContent = `Pokemon numero ${data.id}`
    //Aca abajo llamo a las dos funciones que van a representar que tipo de pokemon es y sus estadisticas
    renderPokemonType(types);
    renderPokemonStats(stats);
}

//Tipo de pokemon, el innerHTML vacio es para que cada vez que se llame a la funcion, "limpie" todo. Despues hago un foreach para recorrer y agregar un div con el type.name que traigo desde la API
const renderPokemonType = (types) => {
    pokeTypes.innerHTML = "";
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//Lo mismo que la funcion de arriba.
const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = "";
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName)
        statElement.appendChild(statElementAmount)
        pokeStats.appendChild(statElement)
    })
}

//Esta funcion es llamada por el catch del fetch
const renderNotFound = () => {
    pokeName.textContent = "POKEMON NO ENCONTRADO";
    pokeImage.setAttribute('src', "pokemon-no-encontrado.png");
    pokeId.textContent = "";
    pokeTypes.textContent = "";
    pokeStats.textContent = "";
}