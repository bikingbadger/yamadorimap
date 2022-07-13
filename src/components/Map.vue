<template>
  <div>
    <l-map
      style="height: 80vh; width: 100%"
      :min-zoom="minZoom"
      v-model:zoom="zoom"
      :max-zoom="maxZoom"
      :center="defaultLocation"
      @click="addMarker"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-layers />

      <l-marker
        v-for="location in locations"
        :key="location._id"
        :lat-lng="location.latLng"
        @click="deleteMarker(location)"
      >
        <l-tooltip>{{ location.tree }}</l-tooltip>
        <l-icon
          v-if="location.image"
          :icon-url="location.image"
          :icon-size="iconSize"
        />
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Import auth
import { useAuth0 } from '@auth0/auth0-vue';

// Import the store
import { storeToRefs } from 'pinia';
import { useLocationStore } from '../store/location';
import uuidv4 from '../utils/uuid';

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
const defaultLocation = reactive(latLng(32.0461, 34.8516));

const iconSize = computed(() => {
  return [iconWidth.value, iconHeight.value];
});

// Location related setup
const { locations } = storeToRefs(useLocationStore());
const locationStore = useLocationStore();
locationStore.getLocations();

// const user = reactive({
//   defaultLocation: latLng(32.0461, 34.8516),
// });

const { user } = useAuth0();

function addMarker(event) {
  if (!event.latlng) return;

  const location = {
    _id: uuidv4(),
    userID: user._rawValue.sub,
    latLng: `${event.latlng.lat},${event.latlng.lng}`,
    tree: event.tree || 'Test Tree',
    image: event.image || '',
    notes: event.notes || '',
    public: event.public || false,
  };

  locationStore.addMarker(location);
}

function deleteMarker(location) {
  locationStore.deleteMarker(location);
}
</script>

<style></style>
