import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";

Vue.use(router);
Vue.use(store);

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
