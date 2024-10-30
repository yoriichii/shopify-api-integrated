<template>
  <div class="mt-5 mb-20 flex flex-col md:flex-row md:justify-around">
    <div v-if="isLoading" class="flex flex-col items-center md:flex-row mt-8 mr-16">
      <section class="p-4 md:p-12 md:mr-8">
        <div class="relative mb-6 ">
          <p class="skeleton h-6 w-24 md:w-36 mb-3 rounded-md"></p>
          <p class="skeleton h-6 w-60 md:w-[350px] rounded-md"></p>
        </div>
        <div class="flex flex-col items-start gap-4 md:flex-row md:items-start">
          <span class="skeleton h-20 w-20 md:h-28 md:w-28 rounded-md"></span>
          <div>
            <p class="skeleton h-6 w-24 md:w-36 mb-4 rounded-md"></p>
            <p class="skeleton h-6 w-24 md:w-36 rounded-md"></p>
          </div>
        </div>
        <div class="relative mt-10 md:mt-20">
          <p class="skeleton h-16 w-full md:w-[500px] mb-4 rounded-md"></p>
          <p class="skeleton h-16 w-full md:w-[500px] rounded-md"></p>
        </div>
      </section>
      <section class="mt-8 md:mt-16">
        <div class="relative space-y-4 md:space-y-5 md:right-8">
          <p class="skeleton h-6 w-24 md:w-36 mb-3 rounded-md"></p>
          <p class="skeleton h-6 w-60 md:w-[350px] rounded-md"></p>
          <p class="skeleton h-10 w-full md:w-[500px] rounded-md"></p>
          <p class="skeleton h-10 w-full md:w-[500px] rounded-md"></p>
          <p class="skeleton h-10 w-full md:w-[500px] rounded-md"></p>
          <p class="skeleton h-10 w-full md:w-[500px] rounded-md"></p>
          <p class="skeleton h-10 w-full md:w-[500px] rounded-md"></p>
        </div>
      </section>
    </div>
    <div v-else>
      <payment 
        shipping="Free"
        :totalPrice="store.totalPrice" 
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import payment from "../components/payment.vue";
import { useCartStore } from '../composables/store.js';

const store = useCartStore();
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); 
});
</script>

<style scoped>

</style>
