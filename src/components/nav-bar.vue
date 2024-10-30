<template>
    <div class="flex justify-around items-center mt-3 relative">
      <span v-if="isHomeRoute">{{ currentTime }}</span>
      <router-link
        v-else
        to="/products"
        @click="backToHome"
        class="hover:underline text-lg"
        >Back</router-link
      >
      <img
        @click="backToHome"
        src="https://kdmv.io/cdn/shop/files/KDMV_LOGO_OG_BLACK.png?v=1725215302&width=150"
        alt="KDMV-LOGO"
        class="cursor-pointer"
      />
      <span @click="toggleCart" class="cursor-pointer"
        >CART ({{ totalQuantity  }})</span
      >
  
      <!-- Sidebar overlay -->
      <transition name="slide">
      <div v-if="isCartOpen" class="sidebar-overlay">
        <sideBarCart @closeCart="closeCart" />
      </div>
    </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, computed} from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useCartStore } from "../composables/store.js";
  import sideBarCart from "../components/side-bar-cart.vue";
  
  const router = useRouter();
  const route = useRoute();
  const store = useCartStore();
  
  const isHomeRoute = computed(() => {
    return route.path === "/";
  });
  
  const backToHome = () => {
    router.push("/");
  };

  const totalQuantity = computed(() => {
  return store.cart.reduce((total, item) => total + item.quantity, 0);
});
  
  const currentTime = ref(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  );
  
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }, 1000);
  
  const isCartOpen = ref(false);
  
  const toggleCart = ()=>{
    isCartOpen.value = !isCartOpen.value;
    if (isCartOpen.value) {
      document.body.classList.add('overflow-hidden');
    } 
  }
  
  const closeCart = () =>{
    isCartOpen.value = false;
    document.body.classList.remove('overflow-hidden');
  }
  
  </script>
  
  <style scoped>
  
  .sidebar-overlay {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px; 
    height: 100vh;
    z-index: 30;
    background-color: white;
    box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  }
  
  /* Slide Transition */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.7s ease;
  }
  
  .slide-enter {
    transform: translateX(100%);
  }
  
  .slide-leave-to {
    transform: translateX(100%); 
  }
  </style>
  