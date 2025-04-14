async function init(){
    checkData();
}

async function getData(){
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    return await response.json();    
}

async function checkData(){
    try {
        let pokemons = await getData();
        let entries = Object.entries(pokemons.results);
        console.log(entries)
        console.log(pokemons)
    } catch (error) {
        console.log("Error bei den Daten:", error);   
    }
}

function renderCards(pokemons){
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (const key of pokemons) {
        console.log(key)
    }

    pokemons.forEach(pokemon => {
        contentRef.innerHTML += getCardTemplate(pokemon)
    });
}
