import { defineStore } from 'pinia';
import { latLng } from 'leaflet';
import { authHeader } from '../utils/auth-header.js';

const apiurl = `${process.env.VUE_APP_API_URL}`;

export const useLocationStore = defineStore('locations', {
  state: () => ({
    /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
    locations: [],
  }),
  actions: {
    async getLocations() {
      const apiEndpoint = `${apiurl}/api/coordinates`;
      const result = await fetch(apiEndpoint, {
        method: 'GET',
        headers: await authHeader(),
      });

      const data = await result.json();
      const userLocations = [...data.data];
      this.locations = userLocations.map((location) => {
        const parsedLatLng = location.latLng
          .split(',')
          .map((ll) => parseFloat(ll));
        return {
          _id: location._id,
          latLng: latLng(parsedLatLng),
          tree: location.tree,
          image: location.image,
          notes: location.notes,
          public: location.public,
        };
      });
    },
    async addLocation(location) {
      const apiEndpoint = `${apiurl}/api/coordinate`;
      const payload = location;
      const result = await fetch(apiEndpoint, {
        method: 'POST',
        headers: await authHeader(),
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      const newLocation = data.data;

      const parsedLatLng = newLocation.latLng
        .split(',')
        .map((ll) => parseFloat(ll));
      newLocation.latLng = latLng(parsedLatLng);
      this.locations.push(newLocation);
    },
    async deleteLocation(location) {
      const payload = { ...location };
      payload.latLng = `${location.latLng.lat},${location.latLng.lng}`;
      const apiEndpoint = `${apiurl}/api/coordinate`;
      const result = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: await authHeader(),
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      console.log(data);
      const removedLocation = data.data;

      this.locations.splice(
        this.locations.findIndex((item) => item._id === removedLocation._id),
        1,
      );
    },
  },
});
