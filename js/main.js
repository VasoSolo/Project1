const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(container = '.products', text_button = 'добавить в корзину') {
        this.container = container;
        this.text_button = text_button;
        this.goods = [];
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data];
                this.render()
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render(this.text_button));
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(txt) {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">${txt}</button>
            </div>`
    }
}

let list = new ProductsList();
list._getProducts();
list.render();

class CartList extends ProductsList { //наследуем список товаров в корзине от ProductsList
    constructor(container = '.cart', text_button = 'удалить из корзины') {
        super(container, text_button);
    }

    _getProductsToCart() {
        return fetch(`API/getBasket.json`)
            .then(res => res.json())
            .then(data => {
                this.goods = [...data.contents];
                this.render()
            })
            .catch(err => console.log(err))
    }
    addToCart(CartItem) { // добавление товара (типа CartItem) в корзину
        //если такого товара еще нет в корзине - добавляем его, если есть - изменяем свойство amount методом changeAmount
        this.goods.push(CartItem);
        //в массиве goods теперь будут лежать не объекты product, а объекты 
    };

    deleteFromCart(CartItem) { //удаление товара из корзины
        //ищем товар по CartItem.id в CartList.goods и удаляем
    };

    calcSum() { // подсчёт цены всех товаров в корзине
        let sum = 0;
        for (let prod of this.goods) {
            sum += prod.price * prod.amount;
        }
        return sum;
    };
}

class CartItem extends ProductItem {
    constructor(product, img = 'https://placehold.it/200x150', amount) {
        super(product, img = 'https://placehold.it/200x150');
        this.amount = amount; //количество товаров в корзине 
    }
    changeAmount(num) { //изменение количества товара в корзине
        this.amount = num
    };
}

let CartList_test = new CartList();
/* CartList_test.addToCart({ id: 1, title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150', amount: 1 });
CartList_test.addToCart({ id: 4, title: 'Gamepad', price: 50, img: 'https://placehold.it/200x150', amount: 2 }); */
CartList_test._getProducts();
CartList_test.render();