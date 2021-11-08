<template>
  <div class="nav-container">
    <router-link to="/">
        <a-icon
          type="home"
          :style="{ fontSize: '20px', marginTop: '3px',color: 'white' }"
        />
      <!-- <div class="logo">Home</div> -->
    </router-link>
    <!-- <router-link to="/cart"> -->
    <router-link to="/cart" id='cart-text'>
        <template slot="title">
          <span>Cart</span>
        </template>
        <a-badge :count="getBadgeCount">
        <a href="#" class="head-example" />
        <a-icon
          type="shopping-cart"
          :style="{ fontSize: '20px', marginTop: '3px' }"
        />
        <span style="marginLeft: 5px">$({{getCartTotalAmount}})</span>
      </a-badge>
    </router-link>
      
    <!-- </router-link> -->
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex';

export default {
  name: 'Navbar',
  data() {
      return {};
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['getCartTotalAmount'])
  },
  methods: {
    getBadgeCount(){
      return this.cart.length;
    }
  },
};
</script>

<style>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-container .logo {
  font-size: 24px;
  font-weight: bolder;
  font-style: oblique;
  text-transform: uppercase;
  font-variant: all-petite-caps;
}
#cart-text{
  color: white;
}
</style>