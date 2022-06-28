<template>
  <div>
    <l-map
      style="height: 80vh; width: 100%"
      :min-zoom="minZoom"
      v-model:zoom="zoom"
      :max-zoom="maxZoom"
      :center="user.defaultLocation"
    >
      <!--   @click="addMarker" -->
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

      <!-- <l-marker
        v-for="location in locations"
        :key="location.id"
        :lat-lng="location.latLng"
        @click="removelocation(location.id)"
        draggable
      >
        <l-tooltip>{{ location.tooltip }}</l-tooltip>
        <l-icon :icon-url="location.iconUrl" :icon-size="iconSize" />
      </l-marker> -->

      <l-marker
        v-for="location in locations"
        :key="location.id"
        :lat-lng="location.latLng"
      >
        <l-tooltip>{{ location.tooltip }}</l-tooltip>
        <l-icon :icon-url="location.iconUrl" :icon-size="iconSize" />
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Import the store
import { storeToRefs } from 'pinia';
import { useLocationStore } from '../store/location';

import { latLng } from 'leaflet/dist/leaflet-src.esm';
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,

  // LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from '@vue-leaflet/vue-leaflet';

// Map related setup
const zoom = ref(8);
const minZoom = ref(2);
const maxZoom = ref(19);
const iconWidth = ref(25);
const iconHeight = ref(25);

const iconSize = computed(() => {
  return [iconWidth.value, iconHeight.value];
});

// Location related setup
const { locations } = storeToRefs(useLocationStore());
const locationStore = useLocationStore();
locationStore.getLocations();

const user = reactive({
  defaultLocation: latLng(32.0461, 34.8516),
});

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
</script>

<style></style>
