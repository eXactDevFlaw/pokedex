let loadStart = 0;
let loadCount = 20;
let latestRenderIndex = 0;
let fetchedData = {
  raw: [],
  sorted: [],
};

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
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${loadCount}&offset=${loadStart}`
    );
    let responseJson = await response.json();
    fetchedData.raw = responseJson.results;
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    alert("Fehler beim Laden der Daten. Bitte versuche es später erneut!");
  }
}

async function bufferData() {
  let promises = fetchedData.raw.map(async (element) => {
    let data = await fetch(element.url);
    element.pokeData = await data.json();
    delete element.url;
  });
  await Promise.all(promises);
}

function sortBuffer() {
  fetchedData.raw.forEach((element) => {
    fetchedData.sorted.push(element);
  });
}

function renderCards() {
  for (let i = latestRenderIndex; i < fetchedData.sorted.length; i++) {
    let data = fetchedData.sorted[i];
    let icons = renderIcons(data);
    contentRef.innerHTML += getCardTemplate(data, icons);
  }
  latestRenderIndex = fetchedData.sorted.length
}

function renderIcons(data) {
  let icons = "";
  if (data.pokeData.types && data.pokeData.types.length > 0) {
    icons += `<img src="${getIconSrc(
      data.pokeData.types[0]?.type.name || ""
    )}">`;
    if (data.pokeData.types.length > 1) {
      icons += `<img src="${getIconSrc(
        data.pokeData.types[1]?.type.name || ""
      )}">`;
    }
  }
  return icons;
}

async function renderMore() {
  loadStart = loadStart + 20;
  await initData(loadStart, loadCount);
  renderCards(loadStart)  
}

function getIconSrc(type) {
  if (type !== "") {
    return `./assets/icon/types/${type}.svg`;
  } else {
    return ``;
  }
}

function renderDetails(id) {
  document.body.classList.toggle("no_scroll");
  contentRef.classList.toggle("no_hover");
  detailRef.classList.toggle("d_none");
  let correctID = id - 1;
  let data = fetchedData.sorted[correctID];
  let icons = renderIcons(data);
  let aboutData = getDetailData(data);
  let baseStats = getBaseStats(data);
  detailRef.innerHTML = getDetailTemplate(data, icons, aboutData, baseStats);
}

function getDetailData(data){
  let aboutData = {
    height: data.pokeData.height,
    weight: data.pokeData.weight,
    abilities: "",
  }

  if (data.pokeData.abilities && data.pokeData.abilities.length > 0) {
    for (let i = 0; i < data.pokeData.abilities.length; i++) {
      aboutData.abilities += data.pokeData.abilities[i].ability.name;
      if (i < data.pokeData.abilities.length - 1) {
        aboutData.abilities += ", ";
      }
    }
  } else {
    // Fallback, falls keine Fähigkeiten vorhanden sind
    aboutData.abilities = "No abilities found";
  }
  return aboutData;
}

function getBaseStats(data){
  let baseStats = [];
  for (let i = 0; i < data.pokeData.stats.length; i++){
    baseStats.push({
      name: data.pokeData.stats[i].stat.name,
      value: data.pokeData.stats[i].base_stat,
    })
  }
  return baseStats;
}

function toggleLoadingSpinner() {
  loadingRef.classList.toggle("d_none");
  document.body.classList.toggle("no_scroll");
}

function capitalLetter(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function closeDetail() {
  document.body.classList.toggle("no_scroll");
  contentRef.classList.toggle("no_hover");
  detailRef.classList.toggle("d_none");
}

function BubblingProtection(event){
  event.stopPropagation();
}