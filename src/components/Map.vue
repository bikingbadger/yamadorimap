<script setup>
import { ref, reactive, computed } from 'vue';

// Import auth
import { useAuth0 } from '@auth0/auth0-vue';

// Import the store
import { storeToRefs } from 'pinia';
import { useLocationStore } from '../store/location';
import uuidv4 from '../utils/uuid';

// Import Modal for Location
import LocationDetails from '@/components/LocationDetails.vue';

// Import Leaflet
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

const { user } = useAuth0();
const curLocation = reactive({
  _id: '',
  userID: '',
  latlng: '',
  tree: '',
  image: '',
  notes: '',
  public: false,
});

// Modal
let showModal = ref(false);

const openModal = (selectedLocation) => {
  if (!selectedLocation.latlng) return;
  curLocation.latlng = `${selectedLocation.latlng.lat},${selectedLocation.latlng.lng}`;
  curLocation.tree = selectedLocation.tree;
  curLocation.image = selectedLocation.image;
  curLocation.notes = selectedLocation.notes;
  curLocation.public = selectedLocation.public;
  showModal.value = true;
};

function addLocation(event) {
  showModal.value = false;

  const location = {
    _id: uuidv4(),
    userID: user._rawValue.sub,
    latlng: event.latlng,
    tree: event.tree || 'Test Tree',
    image: event.image || '',
    notes: event.notes || '',
    public: event.public || false,
  };

  locationStore.addLocation(location);
}

function deleteLocation(location) {
  showModal.value = false;
  locationStore.deleteLocation(location);
}
</script>

<template>
  <div>
    <l-map
      v-model:zoom="zoom"
      style="height: 80vh; width: 100%"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="defaultLocation"
      @click="openModal"
    >
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <l-control-layers />

      <l-marker
        v-for="location in locations"
        :key="location._id"
        :lat-lng="location.latlng"
        @click="openModal(location)"
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

  <Dialog v-model:visible="showModal" header="Location">
    <location-details
      :CurrentLocation="curLocation"
      @add-location="addLocation"
      @delete-location="deleteLocation"
    />
  </Dialog>
</template>

<style></style>
