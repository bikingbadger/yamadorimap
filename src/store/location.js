import { defineStore } from 'pinia';
import L from 'leaflet';

export const useLocationStore = defineStore('locations', {
  state: () => {
    return {
      /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
      locations: [
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
      ],
      nextId: 0,
    };
  },
  getters: {
    allLocations() {
      return this.locations;
    },
  },
  actions: {
    addMarker(location, treeName) {
      if (!location.latlng) return;
      const newLocation = {
        id: Math.random().toString(36).slice(2),
        latLng: location.latlng,
        tooltip: treeName,
        iconUrl: '',
      };

      this.locations.push(newLocation);
    },
    removeMarker(id) {
      console.log(id);
      this.locations.splice(
        this.locations.findIndex((item) => item.id === id),
        1,
      );
    },
  },
});
