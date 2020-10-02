Products = {
    items: null,
    containersId: null,
    container: null,
    
   async init() {
        await Products.getProducts('http://127.0.0.1:5500/project/src/components/catalog.json'); 
        this.getContainers();
        this.containersId.forEach(id => {
            console.log(id)
            this.container = document.querySelector(`#${id}`)
            if (this.container) {
                this.render(id);
            }
        });
    },

    render(id) {
        let content = '';
        this.items.products.forEach(element => {
            if (element.containers.includes(id) ) {
                content += `
                    <div class="card">
                    <div class="card__hover">
                        <a href="#" class="card__button-add"><img id="${element.id}"  src="../src/assets/images/cart-white.png" alt="cart"
                                class="card__cart-img">Add to Cart</a>
                    </div>
                    <a href="#" class="card__link"><img
                            src="${this.items.baseImgUrl}${element.img}"
                            alt="${element.name}" class="card__img"></a>
                    <div class="card__content">
                        <a href="product.html">
                            <h3 class="card__h3">${element.name}</h3>
                        </a>
                        <div class="card__price">$${element.price}
                            <div class="card__stars">
                                <i class="${element.stars > '0' ? 'fas' : 'far'} ${element.stars === '0.5' ? 'fa-star-half-alt' :'fa-star'  } "></i>
                                <i class="${element.stars > '1' ? 'fas' : 'far'} ${element.stars === '1.5' ? 'fa-star-half-alt' :'fa-star'  }"></i>
                                <i class="${element.stars > '2' ? 'fas' : 'far'} ${element.stars === '2.5' ? 'fa-star-half-alt' :'fa-star'  }"></i>
                                <i class="${element.stars > '3' ? 'fas' : 'far'} ${element.stars === '3.5' ? 'fa-star-half-alt' :'fa-star'  }"></i>
                                <i class="${element.stars > '4' ? 'fas' : 'far'} ${element.stars === '4.5' ? 'fa-star-half-alt' :'fa-star'  }"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        });
        this.container.innerHTML = content;
    },



    async getProducts(url) {
        let res = await fetch(url);
        res.status ? this.items = await res.json() : this.items = []; 
        console.log(this.items.products )
    },

     getContainers() {
        let allContainers = [];
        this.items.products.forEach(element => {
           allContainers = allContainers.concat(element.containers);
        });
        this.containersId = new Set(allContainers);
    }
}

window.onload = async () => { 
    Products.init();
}