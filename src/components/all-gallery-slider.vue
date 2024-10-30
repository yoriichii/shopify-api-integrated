<template>
    <swiper
      :slidesPerView="2"
      :grabCursor="false"
      :navigation="true"
      :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
      }"
      :modules="modules"
      class="mySwiper w-[80%]"
      :breakpoints="{
      769: { 
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    }"
    >
    <swiper-slide v-for="product in store.products" :key="product.id">
        <img :src="product.thumbnail" class="w-[350px]" @click="productView(product.id)"/>
    </swiper-slide>
    </swiper>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation, Autoplay } from 'swiper/modules';
  import { useCartStore } from '../composables/store.js'
  import { useRouter } from 'vue-router';
  import 'swiper/css';
  import 'swiper/css/navigation';

  const store = useCartStore();
  const modules = [Navigation, Autoplay];
  const router = useRouter();
  const productView = async (id) =>{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push({name: 'ProductView', params: { id }})
}

  defineProps({
    imageListSlides: {
    type: Array,
    required: true
    }
  });

  </script>
  
  <style scoped>
  </style>
  