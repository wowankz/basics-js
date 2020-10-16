basket = {
    _items: [],
    _container: null,
    _containerTotalSum: null,
    _badge: null,
    _storage: null,
    checkoutButton: null,
    goToCartButton: null,

    init() {
        this._container = document.querySelector('#basket');
        this._containerTotalSum = document.querySelector('#basket-total');
        this._badge = document.querySelector('#cart-badge');
        this.checkoutButton = document.querySelector('#checkout-button');
        this.goToCartButton = document.querySelector('#go-cart');
        this._storage = window.localStorage;
        this._getStorage();
        this._render();
        this._addListener();
        console.log('Basket init');
    },

    _render() {
        let str = '';
        let total = 0;
        if (this._items.length > 0) {
            this._items.forEach((item) => {
                str += `<div class="drop-cart__product">
                    <a href="product.html" class="drop-cart__product-link">
                        <img src="https://raw.githubusercontent.com/wowankz/static/master/shop/${item.img}"
                            alt="product" class="drop-cart__product-img">
                    </a>
                    <div class="drop-cart__product-info">
                        <a href="product.html" class="drop-cart__product-name">${item.name}</a>
                        <div class="drop-cart__product-stars">
                            <i class="${item.stars > "0" ? "fas" : "far"} ${item.stars === "0.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "1" ? "fas" : "far"} ${item.stars === "1.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "2" ? "fas" : "far"} ${item.stars === "2.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "3" ? "fas" : "far"} ${item.stars === "3.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                              <i class="${item.stars > "4" ? "fas" : "far"} ${item.stars === "4.5" ? "fa-star-half-alt" : "fa-star"}"></i>
                        </div>
                        <div class="drop-cart__product-price">
                            <span class="drop-cart__product-count">${item.amount} </span> x ${item.price}
                            <span class="drop-cart__product-sum"> = $${item.price * item.amount}</span>
                        </div>
                    </div>
                    <a data-remove-product="${item.id}" href="#"  class="drop-cart__product-close"><i class="far fa-times-circle"></i></a>
                </div>`
                total = total + item.price * item.amount;
            });

            this.checkoutButton.classList.remove('disabled');
            this.goToCartButton.classList.remove('disabled');

        } else {
            str = `<div class="drop-cart__empty">Empty</div>`;
            this.checkoutButton.classList.add('disabled');
            this.goToCartButton.classList.add('disabled');

        }

        this._badge.innerText = this._items.length;
        this._containerTotalSum.innerText = '$' + total;
        this._container.innerHTML = str;
    },

    _addListener() {
        document.addEventListener('click', this._handlerClick.bind(this));
    },

    _handlerClick(event) {
        if (event.target.dataset.button === 'addProduct' || event.target.parentNode.dataset.button === 'addProduct') {
            this._addItem(event.target.dataset.item || event.target.parentNode.dataset.item);
            event.preventDefault();
            return;
        }

        if (event.target.dataset.removeProduct || event.target.parentNode.dataset.removeProduct) {
            this._removeItem(event.target.dataset.removeProduct || event.target.parentNode.dataset.removeProduct);
            event.preventDefault();
            return;
        }
    },

    _getStorage() {
        let items = this._storage.getItem('basket');
        items ? this._items = JSON.parse(items) : this._setStorage([]);
    },

    _setStorage(data) {
        this._storage.setItem('basket', JSON.stringify(data));
    },

    _addItem(item) {
        let product = Object.assign({}, { amount: 1 }, JSON.parse(item));
        let searchResult = this._items.find(item => item.id === product.id);
        searchResult ? searchResult.amount++ : this._items.push(product);
        this._render()
        this._setStorage(this._items);

    },

    _removeItem(id) {
        let product = this._items.find(item => item.id === +id);
        product.amount > 1 ? product.amount-- : this._items.splice(this._items.indexOf(product), 1);
        this._render();
        this._setStorage(this._items);

    }
}

basket.init();