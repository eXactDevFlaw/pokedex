function getCardTemplate(pokemon, types) {
    return /*HTML*/ `
    <div class="col-md-4 ">
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">#${pokemon.id} ${pokemon.name}</h5>
        <img class="card-body-img" src="${pokemon.sprites.other.dream_world.front_default}">
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Type: ${types}</strong> </li>
      </ul>
      <div class="card-footer text-center">
        <button class="btn btn-primary btn-sm" onclick="renderDetailData()">More Informations</button>
      </div>
    </div>
  </div>`;
}