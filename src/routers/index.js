import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Category",
    component: () => import("../views/home.vue"),
  },
  {
    path: "/product/:id",
    name: "ProductView",
    component: () => import("../views/product.vue"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("../views/payment.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
