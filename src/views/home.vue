<template>
    <main class="min-h-screen bg-black mt-5 p-8">
        <h1 class="text-4xl font-bold mb-10 relative bottom-5 text-gray-300">
            Products
        </h1>
  
    <div class="max-w-[1150px] mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 ">
        <div v-for="product in store.products" :key="product" class="p-10 group cursor-pointer" @click="productView(product.id)">
        <div class="relative">
        <img :src="product.thumbnail" alt="product-image" class=" bg-white rounded-lg">
        <span class="absolute top-2 left-2 bg-black text-white text-[0.6rem] font-bold px-2 py-1" v-if="sold">Sold out</span>
    </div>
    <div class="p-4">
        <p class="text-white text-2xl group-hover:underline">{{ product.brand }}</p>
        <p class="text-white">{{ product.title }}</p>
        <p class="text-white">${{ product.price }}</p>
    </div>
        </div>
    </div>
    </main>
    </template>
<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '../composables/store.js'
import { useRouter } from 'vue-router';


const store = useCartStore()
const router = useRouter()
setTimeout(() =>{
    
})
const productView = async (id) =>{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push({name: 'ProductView', params: { id }})
}
onMounted(() =>{
    store.fetchProductsFromDB()
})
</script>

<style scoped>

</style>
