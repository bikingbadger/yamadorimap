import { defineStore } from 'pinia';
import { latLng } from 'leaflet';

const apiurl = `${process.env.VUE_APP_API_URL}`;

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
      const apiEndpoint = `${apiurl}/api/coordinates`;
      console.log(apiEndpoint);
      const result = await fetch(apiEndpoint);
      const data = await result.json();
      const userLocations = [...data.data];
      this.locations = userLocations.map((location) => {
        const parsedLatLng = location.latLng
          .split(',')
          .map((ll) => parseFloat(ll));
        return {
          // userID: coordinates.userID,
          // latLng: coordinates.latLng,
          // tree: coordinates.tree,
          // notes: coordinates.notes,
          // image: coordinates.image,
          // public: coordinates.public,
          id: location.id,
          latLng: latLng(parsedLatLng),
          tree: location.tree,
          image: location.image,
          notes: location.notes,
          public: location.public,
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
