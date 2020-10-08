basket = {
    items: null,
    container: null,
    containerTotalSum: null,
    badge: null,
    checkoutButton: null,
    goToCartButton: null,

    init() {
        this.container = document.querySelector("#basket");
        this.containerTotalSum = document.querySelector("#basket-total");
        this.badge = document.querySelector("#cart-badge");
        this.checkoutButton = document.querySelector("#checkout-button");
        this.goToCartButton = document.querySelector("#go-cart");
        this.items = [];
        this._render();
        console.log("basket init");
    },

    _render() {
        let str = '';
        let total = 0;
        if (this.items.length > 0) {
            this.items.forEach((item) => {
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
                            <span class="drop-cart__product-count">${item.count} </span> x ${item.price}
                            <span class="drop-cart__product-sum"> = $${item.price * item.count}</span>
                        </div>
                    </div>
                    <a href="#" onclick="basket.removeItem(${item.id})" class="drop-cart__product-close"><i class="far fa-times-circle"></i></a>
                </div>`

                total = total + item.price * item.count;
                this.checkoutButton.onclick = () => true;
                this.goToCartButton.onclick = () => true;
            });

        } else {
            str = `<div class="drop-cart__empty">Basket is empty</div>`;
            this.checkoutButton.onclick = () => false;
            this.goToCartButton.onclick = () => false;
        }
        this.badge.innerHTML = this.items.length;
        this.containerTotalSum.innerHTML = '$' + total;
        this.container.innerHTML = str;
    },



    addItem(event) {
        let item = JSON.parse(event.currentTarget.dataset.item);
        item.count = 1;
        if (this.items.length > 0) {
            let res = null;
            this.items.forEach((elem, index) => {
                if (elem.id === item.id) res = index;
            });
            res !== null ? this.items[res].count++ : this.items.push(item);
        } else {
            this.items.push(item);
        }
        this._render()
        console.log(this.items);
    },

    removeItem(id) {
        let res = this.items.filter(elem => elem.id != id);
        this.items = res;
        this._render();
    }
}

basket.init();