import { defineStore } from 'pinia';

export const useLocationStore = defineStore('locations', {
  state: {
    /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
    locations: [],
    nextId: 0,
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
