let loadStart = 0;
let loadCount = 20;
let DB = [];
let DB_SORTED = [];

const contentRef = document.getElementById("content");
const detailRef = document.getElementById("detail");

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
  detailRef.classList.remove("d_none")
  console.log(id)
  console.log(DB_SORTED)
}
