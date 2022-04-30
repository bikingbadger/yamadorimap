<template>
  <div style="height: 90vh; width: 90vw">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="user.defaultLocation"
      @move="log('move')"
      @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

      <l-marker v-for="marker, index in markers" :key=index :lat-lng="marker" @click="removeMarker(index)"></l-marker>

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
    <!-- <button @click="changeIcon">New kitten icon</button> -->
  </div>
</template>
<script>
import {
  LMap,
  // LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  // LTooltip,
  // LPopup,
  // LPolyline,
  // LPolygon,
  // LRectangle,
} from '@vue-leaflet/vue-leaflet';

import L from 'leaflet';

export default {
  components: {
    LMap,
    // LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    // LTooltip,
    // LPopup,
    //LPolyline,
    //LPolygon,
    //LRectangle,
  },
  data() {
    return {
      zoom: 10,
      iconWidth: 25,
      iconHeight: 40,
      markers: [
        L.latLng(47.412, -1.218),
        L.latLng(47.413220, -1.219482),
        L.latLng(47.414, -1.22),
      ],
      user: {
        defaultLocation: L.latLng(52, -1.218)
      }
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
    addMarker() {
      console.log('Add to array')
    }
    ,removeMarker() {
      console.log('Remove from the array')
    }
  },
};
</script>
