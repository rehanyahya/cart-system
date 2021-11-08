import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/containers/Home.vue';
import ProductDetail from '@/containers/ProductDetail.vue';
import Cart from '@/containers/Cart.vue';
import Checkout from '@/containers/Checkout.vue';


Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/product/:id',
      name: 'productDetail',
      component: ProductDetail,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
  
export default router;