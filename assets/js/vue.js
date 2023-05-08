const products = [
    { id: 1, description: "Fast and Furious 1", price: 5, img: 'assets/img/fast1.JPG'},
    { id: 2, description: 'Fast and Furious 2', price: 5, img: 'assets/img/fast2.jfif'},
    { id: 3, description: 'Fast and Furious 3', price: 5, img: 'assets/img/fast3.JPG'},
    { id: 4, description: 'Fast and Furious 4', price: 7, img: 'assets/img/fast4.JPEG'},
    { id: 5, description: 'Fast and Furious 5', price: 10, img: 'assets/img/fast5.JPG'},
    { id: 6, description: 'Fast and Furious 6', price: 10, img: 'assets/img/fast6.JPG'},
    { id: 7, description: 'Fast and Furious 7', price: 10, img: 'assets/img/fast7.JPG'},
    { id: 8, description: 'Fast and Furious 8', price: 10, img: 'assets/img/fast8.JPG'},
    { id: 9, description: 'Fast and Furious 9', price: 15, img: 'assets/img/fast9.JPG'},
    { id: 10, description: 'Fast and Furious X', price: 19, img: 'assets/img/fastx.JPEG'},
    { id: 11, description: 'Avatar', price: 15, img: 'assets/img/avatar.JPG'},
    { id: 12, description: 'Avatar 2', price: 19, img: 'assets/img/avatar2.JPG'},
    { id: 13, description: 'Super Mario Bros', price: 19, img: 'assets/img/supermario.JPG'},
    { id: 14, description: 'Creed', price: 10, img: 'assets/img/creed.JPG'},
    { id: 15, description: 'Creed 2', price: 15, img: 'assets/img/creed2.JPG'},
    { id: 16, description: 'Creed 3', price: 19, img: 'assets/img/creed3.JPG'},
    { id: 17, description: 'Divergente', price: 5, img: 'assets/img/divergente.JPG'},
    { id: 18, description: 'Divergente 2', price: 10, img: 'assets/img/divergente2.webp'},
    { id: 19, description: 'Divergente 3', price: 10, img: 'assets/img/divergente3.JPG'},
    { id: 20, description: 'Labyrinthe', price: 10, img: 'assets/img/labyrinthe.JPG'},
    { id: 21, description: 'Labyrinthe 2', price: 15, img: 'assets/img/labyrinthe2.JPG'},
    { id: 21, description: 'Labyrinthe 3', price: 15, img: 'assets/img/labyrinthe3.JPG'},
  ];


const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
        products,
        searchkey: '',
        liked: [],
        cart: []
        }
    },
    computed: {
        filteredList(){
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchkey.toLowerCase());
            })
        },
        getLikeCookie(){
            let cookieValue = ($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
        cartTotalAmount(){
            let total = 0;
            for (let item in this.cart){
                total = total + (this.cart[item].quantity * this.cart[item].price);
            }
            return total;
        },
        itemTotalAmount(){
            let itemTotal = 0;
            for (let item in this.cart){
                itemTotal = itemTotal + (this.cart[item].quantity);
            }
            return itemTotal;
        }
    },
    methods: {
        setLikeCookie(){
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
            })
        },
        addToCart(product){
            //check if already in array
            for (let i = 0; i < this.cart.length; i++){
                if (this.cart[i].id === product.id){
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img:product.img,
                description: product.description,
                price: product.price,
                quantity: 1
            })
        },
        cartPlusOne(product){
            product.quantity = product.quantity + 1;
        },
        cartMinusOne(product, id){
            if (product.quantity == 1) {
                this.cartRemoveItem(id);
            } else{
                product.quantity = product.quantity -1;
            }
        },
        cartRemoveItem(id){
            this.$delete(this.cart, id)
        }
    },
    mounted: () => {
        this.getLikeCookie;
    }
}

const UserSettings = {
    template: '<h1>user-settings</h1>',
    name: 'Home'
}
const WishList = {
    template: '<h1>wish-list</h1>',
    name: 'Home'
}
const shoppingCart = {
    template: '<h1>shopping-cart</h1>',
    name: 'Home'
}

// router

const router = new VueRouter({
    routes: [
    { path: '/', component: Home, anme: 'Home' },
    { path: '/user-settings', component: UserSettings, name : 'UserSettings' },
    { path: '/wish-list', component: WishList, name : 'WishList' },
    { path: '/shopping-cart', component: shoppingCart, name : 'shoppingCart' },
    ]
})



const vue = new Vue({
    router
}).$mount('#app');