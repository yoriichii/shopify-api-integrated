<template>
    <div>
      <div v-if="isLoadingSkeleton" class="flex flex-col md:flex-row justify-center items-center mt-[11rem] ml-16 gap-10">
        <div>
          <p class="skeleton h-48 w-48 rounded-md"></p>
        </div>
        <div class="space-y-3">
          <p class="skeleton h-7 w-36 rounded-md"></p>
          <p class="skeleton h-7 w-36 rounded-md"></p>
          <p class="skeleton h-10 w-[20rem] rounded-md relative top-2"></p>
        </div>
      </div>
  
      <div class="flex flex-col md:flex-row justify-center items-center mt-20" v-else>
        <div>
          <img :src="selectedProduct.thumbnail" alt="product.image" class="w-[300px]">
        </div>
        <div class="space-y-4">
          <p class="text-3xl">Brand: {{ selectedProduct.brand }}</p>
          <span class="text-gray-200 text-sm px-3 py-1 rounded-md bg-black relative top-2">{{ selectedProduct.availabilityStatus }}</span>
          <h2 class="text-gray-400">Price: ${{ selectedProduct.price }} <span class="text-red-400">-{{ selectedProduct.discountPercentage }}%</span></h2>
  
          <button @click="addToCart" :class="[isLoading ? 'opacity-50 px-[142px]' : '', 'text-white px-28 py-3 rounded-md bg-black relative top-4']">
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span>{{ isLoading ? '' : "Add to cart" }}</span>
          </button>
        </div>
      </div>
  
      <sideBarCart v-if="isCartOpen" @closeCart="closeCart"/>
  
      <div class="mt-[5rem] py-20 cursor-pointer">
        <allGallerySlider :imageListSlides="selectedProduct.images" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch, onMounted } from 'vue';
  import { useCartStore } from '../composables/store.js';
  import { useRoute } from 'vue-router';
  import sideBarCart from '../components/side-bar-cart.vue';
  import allGallerySlider from '../components/all-gallery-slider.vue';
  
  const store = useCartStore();
  const route = useRoute();
  const isLoading = ref(false); 
  const isLoadingSkeleton = ref(false)
  const isCartOpen = ref(false);
  
  // Get the selected product based on the route parameter
  const selectedProduct = computed(() => {
    return store.products.find((item) => item.id === +route.params.id);
  });
  
  // Function to load the product data
  
  const loadProductData = async () => {
    isLoadingSkeleton.value = true; // Start loading
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    isLoadingSkeleton.value = false; // End loading
  };
  
  // Watch for changes to the selected product and load its data
  watch(selectedProduct, () => {
    loadProductData(); 
  });
  
  onMounted(() => {
    loadProductData(); 
  });

  const addToCart = async () => {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isCartOpen.value = !isCartOpen.value;
    store.addToCart(selectedProduct.value);
    isLoading.value = false
    
  };
  
  const closeCart = () => {
    isCartOpen.value = false;
  };
  </script>
  
  <style scoped>

  </style>
  