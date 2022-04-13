<template>

  <div style="height: 350px;">
    <div class="info" style="height: 15%">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div>
    <l-map
      style="height: 800px; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer} from 'vue2-leaflet';
import { mapActions } from "vuex";

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      fetchAllLines: "lines/fetchAllLines"
      }),

  // ...mapActions(["login"]),

    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  },
  async mounted(){
    //  await this.login()
   const lines = await this.fetchAllLines()
   console.log(lines);
  }
}
</script>
