import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";

Vue.use(router);
Vue.use(store);

import "leaflet/dist/leaflet.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
