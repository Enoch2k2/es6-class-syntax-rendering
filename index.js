class Wine {
  static all = [];
  static filteredWines = [];
  static filteredSelection = "all"

  constructor(wineData) {
    this.id = wineData.id;
    this.wineType = wineData.wineType;
    this.name = wineData.name;
    this.favorited = wineData.favorited;
    Wine.all.push(this);
  }

  static renderFavorites() {
    // grab the ul element and empty out the lis so that we can re-add the lis
    let ul = document.querySelector("ul.favorites");
    ul.innerHTML = ""

    Wine.favoritedWines = Wine.all.filter(wine => wine.favorited);
    // resetting what the filteredWines are based on the selection (filteredSelection)
    Wine.filteredWines = Wine.filteredSelection == "all" ? [...Wine.favoritedWines] : Wine.favoritedWines.filter(wine => wine.wineType === Wine.filteredSelection)

    Wine.filteredWines.forEach(function(wine){
      ul.innerHTML += wine.render();
    })

    document.querySelector("a.show-page").addEventListener("click", function(e) {
      e.preventDefault();
      alert("We clicked on this view");
    })
  }


  // prototype function
  render(){
    return `<li>Name: ${this.name} - Type: ${this.wineType}</li> - <a href="/wines/${this.id}" class="show-page">View</a>`
  }

  static seedWineData() {
    // fetch /wines -> data, iterate over data (json objects) and create new wine objects
    // fetch('/users/1/wineFavorites')
    // .then(response => response.json())
    // .then(wines => wines.forEach(function(wine) {
    //   new Wine(wine.name, wine.wineType)
    // }))
    new Wine({id: 1, wineType: "red", name: "Red Wine 1", favorited: true})
    new Wine({id: 2, wineType: "red", name: "Red Wine 2", favorited: true})
    new Wine({id: 3, wineType: "red", name: "Red Wine 3"})
    new Wine({id: 4, wineType: "red", name: "Red Wine 4", favorited: true})
    new Wine({id: 5, wineType: "red", name: "Red Wine 5", favorited: undefined})
    new Wine({id: 6, wineType: "white", name: "White Wine 1", favorited: undefined})
    new Wine({id: 7, wineType: "white", name: "White Wine 2", favorited: undefined})
    new Wine({id: 8, wineType: "white", name: "White Wine 3", favorited: true})
  }
}

fetchUser()

window.addEventListener("load", function(){
  Wine.seedWineData();
  Wine.renderFavorites();

  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    Wine.filteredSelection = this.querySelector("select").value;
    Wine.renderFavorites();
  })
});