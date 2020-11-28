const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: "#app",
    data: {
        catalogUrl: '/catalogData.json',
        allProducts: [],
        visibleProducts: [],
        imgCatalog: 'https://placehold.it/200x150',
        userSearch: '',
        isVisibleCart: false,
        searchLine: "",
        cartProducts: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        FilterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.visibleProducts = this.allProducts.filter(product => regexp.test(product.product_name));
        }

    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.allProducts.push(el);
                }
                this.visibleProducts = this.allProducts;
            });
    }
})