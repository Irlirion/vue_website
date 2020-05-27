import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Toasted from "vue-toasted";
import ToggleButton from 'vue-js-toggle-button'

Vue.use(Toasted, {
  position: "bottom-left",
  duration: 8000,
  className: ['toast-css']
});

Vue.use(ToggleButton);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
