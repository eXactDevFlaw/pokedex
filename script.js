let loadStart = 0;
let loadCount = 20;
let DB = [];

const contentRef = document.getElementById("content");

async function init() {
  getData();
}

async function getData(loadStart, loadCount) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${loadCount}&offset=${loadStart}"`);
  let responseJson = await response.json();
  DB = responseJson.results;
  getRawData(DB);
}

function getRawData(DB) {
  DB.forEach(async element => {
    let data = await fetch(element.url);
    let rawData = await data.json();
    renderCards(rawData)
  });
}

function renderCards(pokemon){
    contentRef.innerHTML += getCardTemplate(pokemon)
}