<template>
  <div >
    <l-map 
      style="height: 90vh; width: 90vw"
      :min-zoom="minZoom"
    >
      <!-- v-model:zoom="zoom"
      :max-zoom="maxZoom"
      :center="user.defaultLocation"
      @move="log('move')"
      @click="addMarker" -->
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />
<!-- 
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.latLng"
        @click="removeMarker(marker.id)"
        draggable
      >
        <l-tooltip>{{ marker.tooltip }}</l-tooltip>
        <l-icon :icon-url="marker.iconUrl" :icon-size="iconSize" />
      </l-marker>

      <l-marker
        v-for="location in locations.allLocations"
        :key="location.id"
        :lat-lng="location.latLng"
      ></l-marker> -->
    </l-map>
  </div>
</template>

<script setup>
import { ref
// , reactive, computed 
} from 'vue';

// Import Leaflet Components
//import { latLng } from 'leaflet';
// import { latLng } from "leaflet/dist/leaflet-src.esm";
import {
  LMap,
  // LIcon,
  // LTileLayer,
  // LMarker,
  // LControlLayers,
  // LTooltip,

  // LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from '@vue-leaflet/vue-leaflet';

// Import the locations store
// import { useLocationStore } from '../store/location';

// const zoom = ref(8);
const minZoom = ref(2);
// const maxZoom = ref(19);
// const iconWidth = ref(25);
// const iconHeight = ref(25);

// const locations = useLocationStore();

// const user = reactive({
//   defaultLocation: latLng(32.0461, 34.8516),
// });

// function addMarker(event) {
//   if (!event.latlng) return;
//   //   const newTree = {
//   //     id: Math.random().toString(36).slice(2),
//   //     latLng: event.latlng,
//   //     tooltip: 'New Tree',
//   //     iconUrl: '',
//   //   };

//   //   this.markers.push(newTree);
//   //   console.log(this.markers);
//   // locations.addMarker(latLng, `Math.random().toString(36).slice(2)`);
// }

// function removeMarker(id) {
//   console.log(id);
//   this.markers.splice(
//     this.markers.findIndex((item) => item.id === id),
//     1,
//   );
// }

// const iconSize = computed(() => {
//   return [iconWidth.value, iconHeight.value];
// });

// export default {
//   components: {
//     LMap,
//     LIcon,
//     LTileLayer,
//     LMarker,
//     LControlLayers,
//     LTooltip,
//     // LPopup,
//     //LPolyline,
//     //LPolygon,
//     //LRectangle,
//   },
// };
</script>

<style></style>
