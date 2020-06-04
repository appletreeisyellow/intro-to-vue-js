var app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/vmSocks-green.jpg',
    link: "https://www.chunchunye.com",
    inventory: 1,
    inStock: false,
    onSale: true,
    variants: [
      {
        variantId: 2233,
        variantColor: "green",
        variantImage: "./assets/vmSocks-green.jpg"
      },
      {
        variantId: 2234,
        variantColor: "blue",
        variantImage: "./assets/vmSocks-blue.jpg"
      }
    ],
    sizes: [1, 2, 3, 4, 5],
    cart: 10
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    removeFromCart() {
      if (this.cart < 1){
        return
      }
      this.cart -= 1
    },
    updateProduct(image) {
      this.image = image
    }
  }
})
