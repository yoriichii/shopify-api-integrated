import { defineStore } from "pinia";

export const useCartStore = defineStore("products", {
  state: () => ({
    products: JSON.parse(localStorage.getItem("products")) || [], // Load from localStorage if available
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  }),

  getters: {
    // calculate latest price
    totalPrice(state) {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity * (1 - item.discountPercentage / 100),
        0
      ).toFixed(2);
    },

    // calculate quantity
    quantity(state) {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
  },

  actions: {
    // Update localStorage after modifying the cart
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    // Fetch products from a dummy API
    async fetchProductsFromDB() {
      if (this.products.length === 0) {
        try {
          const response = await fetch("https://dummyjson.com/products");
          const data = await response.json();
          this.products = data.products;
          localStorage.setItem("products", JSON.stringify(this.products));
        } catch (error) {
          console.error("Error fetching products", error);
        }
      }
    },
     
    //Add each product to cart
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If the product is already in the cart, increment its quantity
        existingProduct.quantity += 1;
      } else {
        // Add the product to the cart with an initial quantity of 1
        this.cart.push({ ...product, quantity: 1 });
      }
      this.updateLocalStorage();
    },
    
    // Increment more product in cart
    increment(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
      this.updateLocalStorage();
    },
    
     // Decrement product in cart
    decrement(id) {
      const existingProduct = this.cart.find((item) => item.id === id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Decrement the quantity if more than 1
          existingProduct.quantity -= 1;
        }
      }
      this.updateLocalStorage();
    },

  //Remove a product from the cart
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
      this.updateLocalStorage();
    },
  },
});
