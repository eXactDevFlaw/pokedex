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

function getDetailTemplate(data, icons) {
  return /*HTML*/ `
    <div class="detail d_flex_center">
      <div class="detail-container detail-bg-${data.pokeData.types[0].type.name}"  onclick="BubblingProtection(event)">
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
          <div class="detail-data-table" id="data-table">
          <table class="customTable">
            <thead>
              <tr>
                <th>About</th>
                <th>Base Stats</th>
                <th>Evolution</th>
                <th>Moves</th>
              </tr>
            </thead>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getDetailTableTemplate(){
  return /*HTML*/`
  <tbody>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>Row 1, Cell 2</td>
    <td>Row 1, Cell 3</td>
  </tr>
  <tr>
    <td>Row 2, Cell 1</td>
    <td>Row 2, Cell 2</td>
    <td>Row 2, Cell 3</td>
  </tr>
  <tr>
    <td>Row 3, Cell 1</td>
    <td>Row 3, Cell 2</td>
    <td>Row 3, Cell 3</td>
  </tr>
  <tr>
    <td>Row 4, Cell 1</td>
    <td>Row 4, Cell 2</td>
    <td>Row 4, Cell 3</td>
  </tr>
</tbody>
</table>
  `
}