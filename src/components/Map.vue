<template>
  <div style="height: 90vh; width: 90vw">
    <l-map
      v-model:zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="user.defaultLocation"
      @move="log('move')"
      @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

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

      <!-- <l-marker :lat-lng="[47.41322, -1.219482]">
        <l-icon :icon-url="iconUrl" :icon-size="iconSize" />
        <l-tooltip>Pinus Sylvestris</l-tooltip>
        <l-popup>Pinus Sylvestris,Cool trunk </l-popup>
      </l-marker> -->

      <!-- <l-marker
        :lat-lng="[50, 50]"
        draggable
        @moveend="log('moveend' + `{z},{x},{y}`)"
      >
        <l-popup>Can hold info of tree</l-popup>
      </l-marker>

      <l-marker
        :lat-lng="[0, 0]"
        draggable
        @moveend="log('moveend' + `{z},{x},{y}`)"
      >
        <l-tooltip>Hover for short desc</l-tooltip>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
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

import L from 'leaflet';

const zoom = ref(8);
const minZoom = ref(2);
const maxZoom = ref(19);
const iconWidth = ref(25);
const iconHeight = ref(25);

const markers = reactive([
  {
    id: Math.random().toString(36).slice(2),
    latLng: L.latLng(32.75, 35.5521),
    tooltip: 'Pinus Sylvestris',
    iconUrl: `https://placekitten.com/50/50`,
  },
  {
    id: Math.random().toString(36).slice(2),
    latLng: L.latLng(32.55, 35.3545),
    tooltip: 'Acer Palmatum',
    iconUrl: `https://placekitten.com/50/50`,
  },
  {
    id: Math.random().toString(36).slice(2),
    latLng: L.latLng(33.0451, 35.1578),
    tooltip: 'Ficus Binyamina',
    iconUrl: `https://placekitten.com/50/50`,
  },
]);
const user = reactive({
  defaultLocation: L.latLng(32.0461, 34.8516),
});

function addMarker(event) {
  if (!event.latlng) return;
  const newTree = {
    id: Math.random().toString(36).slice(2),
    latLng: event.latlng,
    tooltip: 'New Tree',
    iconUrl: '',
  };

  this.markers.push(newTree);
  console.log(this.markers);
}

function removeMarker(id) {
  console.log(id);
  this.markers.splice(
    this.markers.findIndex((item) => item.id === id),
    1,
  );
}

const iconSize = computed(() => {
  return [iconWidth.value, iconHeight.value];
});

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
