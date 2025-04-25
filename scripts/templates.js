function getCardTemplate(pokemon) {
    return /*HTML*/ `
    <div class="col-md-4 ">
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">#${pokemon.id} ${pokemon.name}</h5>
        <img src="${pokemon.sprites.front_default}">
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Kalorien:</strong> </li>
        <li class="list-group-item"><strong>Zucker:</strong>  g</li>
        <li class="list-group-item"><strong>Kohlenhydrate:</strong>  g</li>
      </ul>
      <div class="card-footer text-center">
        <a href="#" class="btn btn-primary btn-sm">Mehr Infos</a>
      </div>
    </div>
  </div>`;
}