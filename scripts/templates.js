function getCardTemplate(data, icons) {
  return /*HTML*/ `
    <div class="cards">
      <div class="card d-flex bg-${data.pokeData.types[0].type.name}" onclick="renderDetails(${data.pokeData.id})">
        <div class="card-body d_flex">
          <h4 class="card-title">#${data.pokeData.id} ${capitalLetter(data.pokeData.name)}</h4>
          <img src="${data.pokeData.sprites.other.dream_world.front_default}">
        </div>
        <div class="card-class d_flex">
          ${icons}
        </div>
      </div>
    </div>`;
}

function getDetailTemplate(data, icons, aboutData, baseStats, movesData, gamesData) {
  console.log(data)
  return /*HTML*/ `
    <div class="detail d_flex_center">
      <div class="detail-container bg-${data.pokeData.types[0].type.name}"  onclick="BubblingProtection(event)">
        <div class="detail-head d_flex">
          <h3 class="">#${data.pokeData.id} ${capitalLetter(data.pokeData.name)}</h3>
          <h3 class="detail-btn" onclick="closeDetail()">X</h3>
        </div>
        <div class="detail-img">
          <img class="detail-img-src" src="${data.pokeData.sprites.other.dream_world.front_default}">
          <div class="detail-img-icon">
            ${icons}
          </div>          
        </div>
        <div class="detail-data">
          <div class="detail-navigation">
            <div class="detail-tab active">About</div>
            <div class="detail-tab">Base Stats</div>
            <div class="detail-tab">Games</div>
            <div class="detail-tab">Moves</div>
          </div>
          <div class="detail-content">${getAboutTemplate(aboutData)}</div>
          <div class="detail-content d_none">${getBaseStatsTemplate(baseStats)}</div>
          <div class="detail-content d_none">${gamesData}</div>
          <div class="detail-content d_none">${movesData}</div>
        </div>
      </div>
    </div>
  `;
}

function getAboutTemplate(aboutData) {
  return /*HTML*/`
    <div>
      <li><strong>Height:</strong> ${aboutData.height} inch.</li>
      <li><strong>Weight:</strong> ${aboutData.weight}</li>
      <li><strong>Abilities:</strong> ${aboutData.abilities}</li>
    </div>
  `;
}

function getBaseStatsTemplate(baseStats) {
  return /*HTML*/`
      ${baseStats.map((stat) => `<li><strong>${capitalLetter(stat.name)}:</strong> ${stat.value}</li>`).join("")}
  `;
}