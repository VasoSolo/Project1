class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductsList();
list._fetchProducts();
list.render();

class CartList extends ProductsList { //наследуем список товаров в корзине от ProductsList
    constructor(container = '.cart-list') {
        super(container);
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
        return `суммарная цена ${sum}`;
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
CartList_test.addToCart({ id: 1, title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150', amount: 1 });
CartList_test.addToCart({ id: 4, title: 'Gamepad', price: 50, img: 'https://placehold.it/200x150', amount: 2 });

alert(CartList_test.calcSum())