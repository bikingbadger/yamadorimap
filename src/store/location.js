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
          id: location.id,
          latLng: latLng(parsedLatLng),
          tree: location.tree,
          image: location.image,
          notes: location.notes,
          public: location.public,
        };
      });
    },
    async addMarker(location) {
      const apiEndpoint = `${apiurl}/api/coordinate`;
      const payload = location;
      const result = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      const newLocation = data.data;
      console.log(newLocation);

      const parsedLatLng = newLocation.latLng
        .split(',')
        .map((ll) => parseFloat(ll));
      newLocation.latLng = latLng(parsedLatLng);

      console.log(newLocation);
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
