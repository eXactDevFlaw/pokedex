let loadStart = 0;
let loadCount = 20;
let DB = [];
let DB_SORTED = [];

const contentRef = document.getElementById("content");

async function initData(loadStart, loadCount) {
  await fetchData(loadStart, loadCount);
  await bufferData();
  sortBuffer();
  renderCards();
}

async function fetchData(loadStart, loadCount) {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${loadCount}&offset=${loadStart}"`
  );
  let responseJson = await response.json();
  DB = responseJson.results;
  contentRef.innerHTML = "";
}

async function bufferData() {
  let promises = DB.map(async (element) => {
    let data = await fetch(element.url);
    element.pokeData = await data.json();
    delete element.url;
  });
  await Promise.all(promises);
  console.log(DB)
}

function sortBuffer() {
  DB_SORTED = new Array(DB.length);
  DB.forEach((element) => {
    DB_SORTED[element.pokeData.id -1] = element;
  });
}

function renderCards() {
  DB_SORTED.forEach(element => {
    contentRef.innerHTML += getCardTemplate(element);
  });
}

async function renderMore() {
  loadCount = loadCount + 20;
  await initData(loadStart, loadCount);
}

function getIconSrc(data) {
  if(data !== ""){
    return `./assets/icon/types/${data}.svg`
  }else{
    return ``;
  }
}