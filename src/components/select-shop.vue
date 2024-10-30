<template>
  <section>
    <p class="text-gray-400 mb-2">Size</p>
    <div class="flex gap-3 flex-wrap">
      <button
        v-for="size in sizes"
        :key="size"
        :class="{
          'active-size-button': selectedSize === size && !isSoldOut,
          'not-size-button': selectedSize !== size,
          'out-of-stock': outOfStock.includes(size),
        }"
        @click="selectSize(size)"
        :disabled="isSoldOut"
      >
        {{ size }}
      </button>
    </div>
    <div class="mt-7">
 <button @click="addToCard"
          :class="[
            isSoldOut ? 'opacity-50 cursor-not-allowed' : 'opacity-100',
            isLoading ? 'opacity-50 px-[142px]' : '',
            'text-white px-28 py-3 rounded-md bg-black',
            !selectedSize ? 'cursor-not-allowed' : ''
          ]"
          :disabled="isSoldOut || !selectedSize"
        >
        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
          <span>{{ isSoldOut ? "Sold out" : isLoading ? "" : "Add to cart" }}</span>
        </button>

    </div>

  </section>
  <itemChangeSideBar v-if="isCartOpen" @closeCart="closeCart" />
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { defineProps, defineEmits } from "vue";
import { useCartStore } from '../composables/store.js'
// import itemChangeSideBar from "../components/item-change-side-bar.vue";

// Track selected size
const selectedSize = ref(null);
const store = useCounterStore();
const isCartOpen = ref(null)
const isLoading = ref(false);

const props = defineProps({
  sizes: {
    type: Array,
    required: true,
  },
  outOfStock: {
    type: Array,
    default: () => [],
  },
});

// Emit event to notify parent component of size selection
const emit = defineEmits(["sizeSelected"]);

// Compute if all sizes are out of stock
const isSoldOut = computed(() =>
  props.sizes.every((size) => props.outOfStock.includes(size))
);

// Method to handle size selection
const selectSize = (size) => {
  if (!props.outOfStock.includes(size) && !isSoldOut.value) {
    selectedSize.value = size;
    emit("sizeSelected", size);
  }
};

const addToCard = async () =>{
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isCartOpen.value =!isCartOpen.value;
    store.increment();
    isLoading.value = false;
}

const closeCart = () => {
    isCartOpen.value = false;
}
</script>
  
  <style scoped>
.not-size-button {
  @apply bg-white border border-gray-400 rounded-2xl px-5 py-[0.30rem];
}

.active-size-button {
  @apply bg-black text-white rounded-2xl px-5 py-[0.30rem];
}

.out-of-stock {
  @apply border border-gray-200 line-through opacity-70 cursor-not-allowed;
}
</style>
  