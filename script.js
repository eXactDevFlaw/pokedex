let loadStart = 0;
let loadCount = 20;
let latestRenderIndex = 0;
let fetchedData = {
  raw: [],
  sorted: [],
};
let searchData = []

const contentRef = document.getElementById("content");
const detailRef = document.getElementById("detail");
const loadingRef = document.getElementById("loading-spinner");
const footerRef = document.getElementById("footer");


async function initData(loadStart, loadCount) {
  toggleLoadingSpinner();
  await fetchData(loadStart, loadCount);
  await bufferData();
  sortBuffer();
  toggleLoadingSpinner();
  renderCards();
  searchPokemon();
}

async function fetchData(loadStart, loadCount) {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${loadCount}&offset=${loadStart}`
    );
    let responseJson = await response.json();
    fetchedData.raw = responseJson.results;
  } catch (error) {
    console.error("Error on load:", error);
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

function renderCards(id) {
  for (let i = latestRenderIndex; i < fetchedData.sorted.length; i++) {
    let data = fetchedData.sorted[i];
    let icons = renderIcons(data);
    contentRef.innerHTML += getCardTemplate(data, icons);
  }
  latestRenderIndex = fetchedData.sorted.length;
}

function renderIcons(data) {
  let iconsHTML = "";
  const types = data.pokeData.types;
  if (types && types.length > 0) {
    iconsHTML += `<img src="${getIconSrc(types[0].type.name)}">`;
    if (types.length > 1) {
      iconsHTML += `<img src="${getIconSrc(types[1].type.name)}">`;
    }
  }
  return iconsHTML;
}

async function renderMore() {
  loadStart = loadStart + 20;
  await initData(loadStart, loadCount);
  renderCards(loadStart);
}

function getIconSrc(type) {
  if (type !== "") {
    return `./assets/icon/types/${type}.svg`;
  } else {
    return ``;
  }
}

function renderDetails(id) {
  document.body.classList.add("no_scroll");
  contentRef.classList.add("no_hover");
  detailRef.classList.remove("d_none");
  detailData(id);
  setupTabs();
  checkArrow(id);
}

function detailData(id) {
  let correctID = id - 1;
  let data = fetchedData.sorted[correctID];
  let icons = renderIcons(data);
  let aboutData = getDetailData(data);
  let baseStats = getBaseStats(data);
  let movesData = getMovesData(data);
  let gamesData = getGamesData(data);
  detailRef.innerHTML = getDetailTemplate(data,icons,aboutData,baseStats,movesData,gamesData);
}

function getDetailData(data) {
  let aboutData = {
    height: data.pokeData.height,
    weight: data.pokeData.weight,
    abilities: "",
  };

  if (data.pokeData.abilities && data.pokeData.abilities.length > 0) {
    for (let i = 0; i < data.pokeData.abilities.length; i++) {
      aboutData.abilities += data.pokeData.abilities[i].ability.name;
      if (i < data.pokeData.abilities.length - 1) {
        aboutData.abilities += ", ";
      }
    }
  }
  return aboutData;
}

function getBaseStats(data) {
  let baseStats = [];
  for (let i = 0; i < data.pokeData.stats.length; i++) {
    baseStats.push({
      name: data.pokeData.stats[i].stat.name,
      value: data.pokeData.stats[i].base_stat,
    });
  }
  return baseStats;
}

function getMovesData(data) {
  let moves = data.pokeData.moves;
  let movesHTML = "";
  for (let i = 0; i < moves.length; i++) {
    const element = moves[i].move.name;
    movesHTML += `<li><strong>${capitalLetter(element)}</strong></li>`;
  }
  return movesHTML;
}

function getGamesData(data) {
  let games = data.pokeData.game_indices;
  let gamesHTML = "";
  for (let i = 0; i < games.length; i++) {
    const element = games[i].version.name;
    gamesHTML += `<li><strong>${capitalLetter(element)}</strong></li>`;
  }
  return gamesHTML;
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

function windowUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function windowDown() {
  footerRef.scrollIntoView({ behavior: "smooth" });
}

function BubblingProtection(event) {
  event.stopPropagation();
}

function setupTabs() {
  const tabs = document.querySelectorAll(".detail-tab");
  const tabContents = document.querySelectorAll(".detail-content");

  tabs[0].classList.add("active");
  tabContents[0].classList.remove("d_none");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.add("d_none"));
      tab.classList.add("active");
      tabContents[index].classList.remove("d_none");
    });
  });
}

function backward(id) {
  if (id <= 1) {
    // Do nothing
  }else{
    let backwardID = id - 1;
    return renderDetails(backwardID);
  }
}

function forward(id) {
  if (id < fetchedData.sorted.length) {
    let forwardID = id + 1;
    return renderDetails(forwardID); 
  }else{
    // Do nothing
  }
}

function checkArrow(id) {
  const arrowLeftRef = document.getElementById("arrow-left");
  const arrowRightRef = document.getElementById("arrow-right");

  if (id <= 1) {
    arrowLeftRef.classList.add("v_hidden");
  } else {
    arrowLeftRef.classList.remove("v_hidden");
  }
  if (id >= fetchedData.sorted.length) {
    arrowRightRef.classList.add("v_hidden");
  } else {
    arrowRightRef.classList.remove("v_hidden");
  }
}

function searchPokemon() {
  const searchRef = document.getElementById("searchbar");
  searchRef.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    console.log(value);
    if (value.length >= 2) {
      searchData = fetchedData.sorted.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(value);
      });
      console.log(searchData);
      renderCards(searchData);
      renderSearchedCards();
    }
  });
  
}

function renderSearchedCards() {
  contentRef.innerHTML = "";
  searchData.forEach((data) => {
    console.log(data.pokeData.id);
    renderCards(data.pokeData.id);
  });
}