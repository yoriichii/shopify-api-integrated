<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-30 z-10 flex justify-end"
    @click.self="closeSidebar"
  >
    <!-- Sidebar content -->
    <div
      class="w-full max-w-md bg-[#f6f6f6] shadow-lg flex flex-col relative z-20"
    >
      <!-- Header with logo and close button -->
      <div class="p-4 flex justify-between items-center border-b">
        <div class="w-24 mx-auto">
          <img
            src="https://kdmv.io/cdn/shop/files/KDMV_LOGO_OG_BLACK.png?v=1725215302&width=150"
            alt="kdmv logo"
            class="w-full"
          />
        </div>
        <button @click="closeSidebar" class="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Sidebar body -->
      <div class="flex-grow overflow-y-auto p-4">
        <div v-if="store.cart.length === 0" class="text-center">
          <h1>Your cart is empty</h1>
        </div>
        <div v-else>
          <h2 class="text-gray-600">Your Cart</h2>
          <div class="flex items-center mt-8 opacity-50">
            <p class="text-sm ml-1">PRODUCT</p>
            <p class="text-sm flex ml-[18.5rem]">TOTAL</p>
          </div>
          <hr class="border-[0.1rem] opacity-5 border-black relative top-5" />

          <section
            v-for="item in store.cart"
            :key="item.id"
            class="mt-16 flex gap-7"
          >
            <div>
              <img :src="item.thumbnail" class="h-[120px]" />
            </div>
            <div class="space-y-1">
              <div class="flex">
                <p>{{ item.brand || "N/A" }} ({{ item.category }})</p>
                <span
                  v-if="isLoading[item.id]"
                  class="loading loading-spinner loading-sm ml-[6.5rem] mr-5 mb-5"
                ></span>
                <p class=" ml-[6.5rem]" v-if="!isLoading[item.id]">
                  ${{ (item.price * item.quantity * (1 - item.discountPercentage / 100)).toFixed(2) }}
                </p>  
              </div>
              <div class="space-y-1">
                <p class="text-[1rem] opacity-50">
                  discount: {{ item.discountPercentage }}%
                </p>  
              </div>
              <div class="flex flex-row">
                <div
                  class="border border-gray-500 py-1 px-5 rounded-md flex gap-10 items-center"
                >
                  <button
                    @click="changeQuantity('decrement', item)"
                    class="text-3xl"
                    :disabled="item.quantity === 1"
                  >
                    -
                  </button>
                  <span class="text-xl">{{ item.quantity }}</span>
                  <button
                    @click="changeQuantity('increment', item)"
                    class="text-2xl"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="changeQuantity('removeFromCart', item)"
                  class="ml-5"
                >
                  <img
                    src="../assets/image/delete.png"
                    alt="delete-icon"
                    class="w-5"
                  />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <!-- Footer section -->
      <div class="p-4 border-t" v-if="store.cart.length > 0">
        <div class="mb-5">
          <span class="text-lg font-medium mb-4 text-center">Estimated total</span>
          <span class="opacity-50 absolute right-4">${{ store.totalPrice }} USD</span>
        </div>
        <button @click="goToPayment"
          class="w-full bg-[#29A33D] text-white py-3 px-4 rounded hover:bg-[#297c37] transition duration-200"
        >
          Check Out
        </button>
      </div>
      <div class="p-4 border-t" v-if="store.cart.length === 0">
        <button
          @click="backToHome"
          class="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded hover:bg-gray-300 transition duration-200"
        >
          Continue shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "../composables/store.js";

const router = useRouter();
const isLoading = ref({});
const store = useCartStore();

const emit = defineEmits(["closeCart"]);

const closeSidebar = () => {
  emit("closeCart");
};

const backToHome = () => {
  router.push({ name: "Category" });
};

const changeQuantity = (action, item) => {
  isLoading.value[item.id] = true;
  setTimeout(() => {
    if (action === "increment") store.increment(item);
    else if (action === "decrement") store.decrement(item.id);
    else if (action === "removeFromCart") store.removeFromCart(item.id);
    isLoading.value[item.id] = false;
  }, 1000);
};

const goToPayment = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  router.push({ name: "Payment" });
  emit("closeCart");
};
</script>

<style scoped>
</style>
