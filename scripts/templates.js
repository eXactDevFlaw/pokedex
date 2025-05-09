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

function getDetailTemplate(data, icons, aboutData, baseStats) {
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
            <h4 class="detail-tab">About</h4>
            <h4 class="detail-tab">BaseStats</h4>
            <h4 class="detail-tab">Evolution</h4>
            <h4 class="detail-tab">Moves</h4>
          </div>
          <div class="detail-content" id="about">
          <p><strong>Height:</strong> ${aboutData.height}</p>
          <p><strong>Weight:</strong> ${aboutData.weight}</p>
          <p><strong>Abilities:</strong> ${aboutData.abilities}</p>
        </div>
        </div>
      </div>
    </div>
  `;
}