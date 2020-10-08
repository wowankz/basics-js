function createProducts(url, container) {
  return {
    items: null,
    container: null,

    async init() {
      this.container = container;
      await this.getProducts(url);
      this.render();
      this._addEvent();
    },

    render() {
      let content = "";
      this.items.products.forEach((item) => {
        content += `<div class="card">
                      <div class="card__hover">
                        <a id="${item.id}" href="#" class="card__button-add" data-item='${JSON.stringify(item)}' data-cart="basket">
                          <img   src="../src/assets/images/cart-white.png" alt="cart" class="card__cart-img">
                          Add to Cart
                        </a>
                      </div>
                      <a href="#" class="card__link">
                        <img src="${this.items.baseImgUrl}${item.img}" alt="${item.name}" class="card__img">
                      </a>
                      <div class="card__content">
                        <a href="product.html">
                          <h3 class="card__h3">${item.name}</h3>
                        </a>
                        <div class="card__price">
                          $${item.price}
                          <div class="card__stars">
                              <i class="${item.stars > "0" ? "fas" : "far"} ${item.stars === "0.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "1" ? "fas" : "far"} ${item.stars === "1.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "2" ? "fas" : "far"} ${item.stars === "2.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "3" ? "fas" : "far"} ${item.stars === "3.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "4" ? "fas" : "far"} ${item.stars === "4.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                          </div>
                        </div>
                      </div>
                    </div> `;
      });
      this.container.innerHTML = content;
    },

    _addEvent() {
      let buttons = document.querySelectorAll('a[data-cart="basket"]');
      buttons.forEach(button => {
        button.addEventListener("click", basket.addItem.bind(basket), true);
      })
    },

    async getProducts(url) {
      let res = await fetch(url);
      res.status ? (this.items = await res.json()) : (this.items = []);
      console.log(this.items.products);
    },
  };
}
let Prod = null;
let Cat = null;
let Like = null;

window.onload = () => {
  let container = document.querySelector("#prod");
  container ? ((Prod = createProducts("https://raw.githubusercontent.com/wowankz/static/master/shop/models/prod.json", container)), Prod.init()) : "";

  container = document.querySelector("#cat");
  container ? ((Cat = createProducts("https://raw.githubusercontent.com/wowankz/static/master/shop/models/cat.json", container)), Cat.init()) : "";

  container = document.querySelector("#like");
  container ? ((Like = createProducts("https://raw.githubusercontent.com/wowankz/static/master/shop/models/like.json", container)), Like.init()) : "";
};
