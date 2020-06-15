Vue.config.devtools = true

Vue.component('product-review', {
  props: {

  },
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following errors:</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </P>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <div>
        <p>Would you recommand this product?</p>
        <label>
          Yes
          <input type="radio" :value="true" v-model="willRecommand">  
        </label>
        <label>
          No
          <input type="radio" :value="false" v-model="willRecommand">
        </label>
      </div>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      willRecommand: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.willRecommand) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: Number(this.rating),
          willRecommand: this.willRecommand
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.willRecommand = null
        this.errors = []
      } else {
        if (!this.name) this.errors.push("Name required")
        if (!this.review) this.errors.push("Review required")
        if (!this.rating) this.errors.push("Rating required")
        if (!this.willRecommand) this.errors.push("Recommendation required")
      }
    }
  }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})



Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div>

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

          <button v-on:click="removeFromCart">
          Add to cart
          </button>
       </div>  
    
      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">No reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</P>
            <p>Rating: {{ review.rating }}</P>
            <p>{{ review.review }}</P>
            <p>Will recommand: {{ review.willRecommand ? "Yes" : "No" }}</p>
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>
    </div>
   `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
        this.selectedVariant = index
    },
    addReview(productReview) {
      this.reviews.push(productReview)
    }
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      image(){
          return this.variants[this.selectedVariant].variantImage
      },
      inStock(){
          return this.variants[this.selectedVariant].variantQuantity
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
          return 2.99
      }
  }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
      addToCart(id) {
        this.cart.push(id)
      },
      removeFromCart(id) {
        let index = this.cart.indexOf(id)
        this.cart.splice(index, 1)
      }
    }
})