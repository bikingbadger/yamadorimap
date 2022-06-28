import { defineStore } from 'pinia';
import { latLng } from 'leaflet';

export const useLocationStore = defineStore('locations', {
  state: () => ({
    /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
    locations: [],
    nextId: 0,
  }),
  getters: {
    allLocations() {
      return this.locations;
    },
  },
  actions: {
    async getLocations() {
      console.log('location');
      const result = await fetch('http://localhost:3000/api/coordinates');
      console.log('location', result);
      const data = await result.json();
      console.log('location', JSON.stringify(data, null, 2));
      const userLocations = [...data.data];
      console.log('location', JSON.stringify(userLocations, null, 2));
      this.locations = userLocations.map((location) => {
        const parsedLatLng = location.latLng
          .split(',')
          .map((ll) => parseFloat(ll));
        console.log(parsedLatLng);
        return {
          id: location.id,
          latLng: latLng(parsedLatLng),
          tooltip: location.tooltip,
          iconUrl: location.iconUrl,
        };
      });
    },
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
