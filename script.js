let loadStart = 0;
let loadCount = 20;
let DB = [];
let DB_SORTED = [];

const contentRef = document.getElementById("content");
const detailRef = document.getElementById("detail");
const loadingRef = document.getElementById("loading-spinner");

async function initData(loadStart, loadCount) {
  toggleLoadingSpinner();
  await fetchData(loadStart, loadCount);
  await bufferData();
  sortBuffer();
  toggleLoadingSpinner();
  renderCards();
}

async function fetchData(loadStart, loadCount) {
  let response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${loadCount}&offset=${loadStart}"`
  );
  let responseJson = await response.json();
  DB = responseJson.results;
}

async function bufferData() {
  let promises = DB.map(async (element) => {
    let data = await fetch(element.url);
    element.pokeData = await data.json();
    delete element.url;
  });
  // await new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (promises){
  //       resolve("Alles wurde richtig geladen!");
  //     }else{
  //       reject("Beim laden ist was schief gelaufen!");
  //     }
  //   }, 5000);
  // })
  /*Ausgeklammert um zu simulieren falls die API länger benötigt*/
  await Promise.all(promises) 
}

function sortBuffer() {
  DB_SORTED = new Array(DB.length);
  DB.forEach((element) => {
    DB_SORTED[element.pokeData.id - 1] = element;
  });
}

function renderCards() {
  DB_SORTED.forEach((data) => {
    let icons = '';
      if (data.pokeData.types && data.pokeData.types.length > 0) {
          icons += `<img src="${getIconSrc(data.pokeData.types[0]?.type.name || '')}">`;
      if (data.pokeData.types.length > 1) {
         icons += `<img src="${getIconSrc(data.pokeData.types[1]?.type.name || '')}">`;
      }
    }
    contentRef.innerHTML += getCardTemplate(data, icons);
  });
}

async function renderMore() {
  loadCount = loadCount + 20;
  await initData(loadStart, loadCount);
}

function getIconSrc(type) {
  if (type !== "") {
    return `./assets/icon/types/${type}.svg`;
  } else {
    return ``;
  }
}

function renderDetails(id) {
  document.body.classList.toggle("no_scroll")
  contentRef.classList.toggle("no_hover")
  detailRef.classList.toggle("d_none")
  let correctID = id - 1
  detailRef.innerHTML = getDetailTemplate(DB_SORTED[correctID])
}

function toggleLoadingSpinner(){
  loadingRef.classList.toggle("d_none");
  document.body.classList.toggle("no_scroll")
}

function capitalLetter(name){
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function closeDetail(){
  document.body.classList.toggle("no_scroll")
  contentRef.classList.toggle("no_hover")
  detailRef.classList.toggle("d_none")
}