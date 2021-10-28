<template>
  <div id="app">
    <a-layout>
      <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
        <Navbar />
      </a-layout-header>
      <a-layout-content>
        <router-view :key="$route.fullPath" />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
body {
  margin: 0;
  padding: 0;
}
.ant-layout {
  background: white !important;
}
.ant-layout-content {
  margin-top: 64px;
}
</style>
