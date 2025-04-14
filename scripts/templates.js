function getCardTemplate(pokemon) {
    return /*HTML*/ `
    <div class="col-md-4 ">
    <div class="card h-100 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <p class="card-text text-muted">Familie: ${pokemon.family}</p>
        <p class="card-text text-muted">Gattung: ${pokemon.genus}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Kalorien:</strong> ${pokemon.nutritions.calories}</li>
        <li class="list-group-item"><strong>Zucker:</strong> ${pokemon.nutritions.sugar} g</li>
        <li class="list-group-item"><strong>Kohlenhydrate:</strong> ${pokemon.nutritions.carbohydrates} g</li>
      </ul>
      <div class="card-footer text-center">
        <a href="#" class="btn btn-primary btn-sm">Mehr Infos</a>
      </div>
    </div>
  </div>`;
}