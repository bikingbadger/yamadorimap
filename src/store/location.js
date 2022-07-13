import { defineStore } from 'pinia';
import { latLng } from 'leaflet';

const apiurl = `${process.env.VUE_APP_API_URL}`;

export const useLocationStore = defineStore('locations', {
  state: () => ({
    /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
    locations: [],
  }),
  actions: {
    async getLocations() {
      const apiEndpoint = `${apiurl}/api/coordinates`;
      const result = await fetch(apiEndpoint);
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

      const parsedLatLng = newLocation.latLng
        .split(',')
        .map((ll) => parseFloat(ll));
      newLocation.latLng = latLng(parsedLatLng);
      this.locations.push(newLocation);
    },
    async deleteMarker(location) {
      console.log(location);
      const payload = { ...location };
      payload.latLng = `${location.latLng.lat},${location.latLng.lng}`;
      console.log(payload);
      const apiEndpoint = `${apiurl}/api/coordinate`;
      const result = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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
