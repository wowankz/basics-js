function createProducts(url, container) {
  return {
    _items: null,
    _container: null,

    async init() {
      this._container = container;
      await this._getProducts(url);
      this._render();
      console.log(`Container ${this._container.id}  init`);
    },

    _render() {
      let content = '';
      this._items.products.forEach((item) => {
        content += `<div class="card">
                      <div class="card__hover">
                        <a  href="#" class="card__button-add" data-item='${JSON.stringify(item)}' data-button="addProduct">
                          <img   src="../src/assets/images/cart-white.png" alt="cart" class="card__cart-img">
                          Add to Cart
                        </a>
                      </div>
                      <a href="#" class="card__link">
                        <img src="${this._items.baseImgUrl}${item.img}" alt="${item.name}" class="card__img">
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
      this._container.innerHTML = content;
    },

    async _getProducts(url) {
      let res = await fetch(url);
      res.status ? (this._items = await res.json()) : (this._items = []);
    }
  };
}


let container = document.querySelector('#prod');
container ? createProducts('https://raw.githubusercontent.com/wowankz/static/master/shop/models/prod.json', container).init() : '';

container = document.querySelector('#cat');
container ? createProducts('https://raw.githubusercontent.com/wowankz/static/master/shop/models/cat.json', container).init() : '';

container = document.querySelector('#like');
container ? createProducts('https://raw.githubusercontent.com/wowankz/static/master/shop/models/like.json', container).init() : '';

