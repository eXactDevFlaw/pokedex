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

function getDetailTemplate(data) {console.log(data)
  return /*HTML*/ `
    <div class="detail d_flex_center">
      <div class="detail-container detail-bg-${data.pokeData.types[0].type.name}">
        <div class="detail-head d_flex">
          <h3 class="">#${data.pokeData.id} ${data.pokeData.name}</h3>
          <button id="" onclick="">X</button>
        </div>
        <div class="detail-img">
          <img scr="${data.pokeData.sprites.other.dream_world.front_default}">
        </div>
        <div class="detail-data">
        Tabelle mit Daten
        </div>
      </div>
    </div>
  `;
}
