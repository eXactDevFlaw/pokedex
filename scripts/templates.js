function getCardTemplate(data, icons) {
  return /*HTML*/ `
    <div class="cards">
      <div class="card d-flex bg-${data.pokeData.types[0].type.name}" onclick="renderDetails(${data.pokeData.id})">
        <div class="card-body d_flex">
          <h3 class="card-title">#${data.pokeData.id} ${data.pokeData.name}</h3>
          <img src="${data.pokeData.sprites.other.dream_world.front_default}">
        </div>
        <div class="card-class d_flex">
          ${icons}
        </div>
      </div>
    </div>`;
}

function getDetailTemplate(data) {
  return /*HTML*/ `
    <div class="col-md-4">
    <div class="card h-100 shadow-sm  bg-${data.pokeData.types[0].type.name}">
    <div class="card-body">
      <h5 class="card-title">#${data.pokeData.id} ${data.pokeData.name}</h5>
      <img class="card-body-img" src="${
        data.pokeData.sprites.other.dream_world.front_default
      }">
    </div>
    <div class="list-group list-group-flush">
      Types: 
      <img src="${getIconSrc(data.pokeData.types[0]?.type.name || "")}"></img>
      <img src="${getIconSrc(data.pokeData.types[1]?.type.name || "")}"></img>
    </div>
    <div class="card-footer text-center">
      <button class="btn btn-primary btn-sm" onclick="closeDetail()">Close</button>
    </div>
  </div>
</div>
  `;
}
