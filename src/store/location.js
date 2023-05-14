import { defineStore } from 'pinia';
import { latLng } from 'leaflet';
import { authHeader } from '../utils/auth-header.js';

const apiurl = `${process.env.VUE_APP_API_URL}/${process.env.VUE_APP_API_VERSION}`;

export const useLocationStore = defineStore('locations', {
  state: () => ({
    /** @type {{ id: string, latLang: L.latLng, tooltip: string, iconUrl: string }[]} */
    locations: [],
  }),
  actions: {
    async getLocations() {
      const apiEndpoint = `${apiurl}/coordinates`;
      const result = await fetch(apiEndpoint, {
        method: 'GET',
        headers: await authHeader(),
      });
      

      const data = await result.json();

      console.log(data);

      const userLocations = [...data.coordinates];

      console.log(userLocations);

      this.locations = userLocations
        .map((location) => {
          if (location.latlng.includes('undefined')) return {};
          const parsedLatLng = location.latlng
            .split(',')
            .map((ll) => parseFloat(ll));
          return {
            _id: location._id,
            latlng: latLng(parsedLatLng),
            tree: location.tree,
            image: location.image,
            notes: location.notes,
            public: location.public,
          };
        })
        // Remove any invalid values that were undefined
        .filter((element) => {
          if (Object.keys(element).length !== 0) {
            return true;
          }

          return false;
        });
    },
    async addLocation(location) {
      const apiEndpoint = `${apiurl}/coordinate`;
      const payload = location;
      const result = await fetch(apiEndpoint, {
        method: 'POST',
        headers: await authHeader(),
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      const newLocation = data.data;
      const parsedLatLng = newLocation.latlng
        .split(',')
        .map((ll) => parseFloat(ll));
      newLocation.latlng = latLng(parsedLatLng);
      this.locations.push(newLocation);
    },
    async deleteLocation(location) {
      const payload = { ...location };
      // payload.latlng = `${location.latlng.lat},${location.latlng.lng}`;
      const apiEndpoint = `${apiurl}/coordinate`;
      const result = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: await authHeader(),
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      // const removedLocation = data.data;

      // this.locations.splice(
      //   this.locations.findIndex((item) => item._id === removedLocation._id),
      //   1,
      // );
      this.getLocations();
    },
  },
});
