import Vue from 'vue'
import App from './App.vue'

import Antd from "ant-design-vue";
import router from "./routes";
import store from "./store";

import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false

Vue.use(Antd);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
