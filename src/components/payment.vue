<template>
  <div>
    <div class="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
      <div class="px-4 pt-8">
        <p class="text-xl font-medium">Order Summary</p>
        <p class="text-gray-400 mt-1">
          Check your items. And select a suitable shipping method.
        </p>
        <div
          class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6"
        >
          <div class="flex flex-col rounded-lg bg-white sm:flex-row" v-for="item in store.cart" :key="item.id">
           <div class="relative">
            <img
              :src="item.thumbnail"
              class="m-2 h-24 w-28 rounded-md border object-cover object-center"
              alt="imageItem"
            />
            <span class="absolute top-0 left-[6.5rem] sm:left-[6rem] lg:left-[5.8rem] bg-gray-300 px-2 rounded-full opacity-80">{{ item.quantity }}</span>
          </div>
            <div class="flex w-full flex-col px-4 py-4">
              <span class="font-semibold">{{ item.brand }}</span>
              <p class="text-lg font-bold">${{ (item.price * item.quantity * (1 - item.discountPercentage / 100)).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <p class="mt-8 text-lg font-medium">Shipping Methods</p>
        <form class="mt-5 grid gap-6">
          <div class="relative">
            <input
              class="peer hidden"
              id="radio_1"
              type="radio"
              name="radio"
              checked
            />
            <span
              class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
            ></span>
            <label
              class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              for="radio_1"
            >
              <img src="../assets/image/vei.png" class="w-14 object-contain" alt="" />
              <div class="ml-5">
                <span class="mt-2 font-semibold">Vireak Buntham Express</span>
                <p class="text-slate-500 text-sm leading-6">
                  Delivery: 1-2 Days
                </p>
              </div>
            </label>
          </div>
          <div class="relative">
            <input
              class="peer hidden"
              id="radio_2"
              type="radio"
              name="radio"
            />
            <span
              class="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
            ></span>
            <label
              class="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              for="radio_2"
            >
              <img src="../assets/image/j&t.png" class="w-14 object-contain" alt="" />
              <div class="ml-5">
                <span class="mt-2 font-semibold">J&T Express</span>
                <p class="text-slate-500 text-sm leading-6">
                  Delivery: 2-3 Days
                </p>
              </div>
            </label>
          </div>
        </form>
      </div>
      <div class="mt-10 px-4 pt-8 lg:mt-0">
        <p class="text-xl font-medium">Payment Details</p>
        <p class="text-gray-400 mt-1">
          Complete your order by providing your payment details.
        </p>
        <div class="">
          <label for="email" class="mt-4 mb-2 block text-sm font-medium"
            >Email</label
          >
          <div class="relative">
            <input
            v-model="email"
              type="text"
              id="email"
              name="email"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your.email@gmail.com"
           
            />
          
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
          </div>
        <span class="text-red-500" v-if="isEmailValidator">Email is requied</span>
    
          <label for="card-holder" class="mt-4 mb-2 block text-sm font-medium"
            >Card Holder</label
          >
          <div class="relative">
            <input
              type="text"
              id="card-holder"
              name="card-holder"
              class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Your full name here"
            />
            <div
              class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>
            </div>
          </div>
          <label for="card-no" class="mt-4 mb-2 block text-sm font-medium"
            >Card Details</label
          >
          <div class="flex">
            <div class="relative w-7/12 flex-shrink-0">
              <input
                type="text"
                id="card-no"
                name="card-no"
                class="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
              >
                <svg
                  class="h-4 w-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"
                  />
                  <path
                    d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="text"
              name="credit-expiry"
              class="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="MM/YY"
            />
            <input
              type="text"
              name="credit-cvc"
              class="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="CVC"
            />
          </div>
          <label
            for="billing-address"
            class="mt-4 mb-2 block text-sm font-medium"
            >Billing Address</label
          >
          <div class="flex flex-col sm:flex-row">
            <div class="relative flex-shrink-0 sm:w-7/12">
              <input
                type="text"
                id="billing-address"
                name="billing-address"
                class="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street Address"
              />
              <div
                class="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3"
              >
                <img
                  class="h-4 w-4 object-contain"
                  src="https://imgs.search.brave.com/N8bG4KmzXeAyhKyfkrHuAdkiP3whyZG3uZ-BMFn8Nvc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zMy5h/bWF6b25hd3MuY29t/L2ltYWdlcy53cHIu/Y29tL2ZsYWctcGFn/ZXMvcG5nMTAwMC9r/aC5wbmc"
                  alt=""
                />
              </div>
            </div>
            <select
              type="text"
              name="billing-state"
              class="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            >
            <option v-for="city in cities" :key="city" value ="city.value">{{ city.name }}</option>
            </select>
            <input
              type="text"
              name="billing-zip"
              class="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ZIP"
            />
          </div>

          <!-- Total -->
          <div class="mt-6 border-t border-b py-2">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">Subtotal</p>
              <p class="font-semibold">${{ totalPrice }}</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">Shipping</p>
              <p class="font-semibold">{{ shipping }}</p>
            </div>
          </div>
          <div class="mt-6 flex items-center justify-between">
            <p class="text-sm font-medium">Total</p>
            <p class="text-2xl font-semibold">${{ totalPrice }}</p>
          </div>
        </div>
        <button @click="payment"
          class="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "../composables/store";

const store = useCartStore()
defineProps({
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  shipping: {
    type: String,
    required: true,
  },
  imageItem: {
    type: String,
    required: true,
  },
});

const cities = [
        { value: '', name: 'Select a city' },
        { value: 'phnom-penh', name: 'Phnom Penh' },
        { value: 'siem-reap', name: 'Siem Reap' },
        { value: 'battambang', name: 'Battambang' },
        { value: 'kampot', name: 'Kampot' },
        { value: 'sihanoukville', name: 'Sihanoukville' },
        { value: 'kep', name: 'Kep' },
        { value: 'pursat', name: 'Pursat' },
        { value: 'kompong-cham', name: 'Kompong Cham' },
        { value: 'kompong-thom', name: 'Kompong Thom' },
        { value: 'takeo', name: 'Takeo' },
        { value: 'prey-veng', name: 'Prey Veng' },
        { value: 'tbong-khmum', name: 'Tbong Khmum' },
        { value: 'oddar-meanchey', name: 'Oddar Meanchey' },
        { value: 'preah-vihear', name: 'Preah Vihear' },
        { value: 'stung-treng', name: 'Stung Treng' },
        { value: 'banteay-meanchey', name: 'Banteay Meanchey' },
        { value: 'kampong-chhnang', name: 'Kampong Chhnang' },
        { value: 'kampong-speu', name: 'Kampong Speu' },
        { value: 'kandal', name: 'Kandal' },
        { value: 'takeo', name: 'Takeo' },
        { value: 'khans', name: 'Khans' },
        { value: 'mouang', name: 'Mouang' },
        { value: 'romduol', name: 'Romduol' },
        { value: 'svay-rang', name: 'Svay Rang' },
        { value: 'banteay-meanchey', name: 'Banteay Meanchey' },
        { value: 'phnom-sroek', name: 'Phnom Sroek' },
    ];

    const email = ref('')
    const startValidatetor = ref(false)
    const payment = () =>{
      startValidatetor.value = true;
    }
    
    const isEmailValidator = computed (() =>{
      return startValidatetor.value ? /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value) : null
    })
</script>

<style scoped>

</style>
