import { createApp } from 'vue';
import App from './App.vue';

// Vue router for routing
import router from './router';

// Leaflet CSS for maps
import 'leaflet/dist/leaflet.css';

// Add PrimeVue for CSS components
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'; //icons

// Import Pinia for state
import { createPinia } from 'pinia';

// Add  auth0
import { domain, clientId } from '../auth_config.json';
import { createAuth0 } from '@auth0/auth0-vue';

const mapApp = createApp(App);

// Use router
mapApp.use(router);

// Use Prime Vue
mapApp.use(PrimeVue);
mapApp.component('Button', Button);
mapApp.component('InputText', InputText);

// Use pinia for state
mapApp.use(createPinia());

// Install authentication plugin
mapApp.use(
  createAuth0({
    domain: domain,
    client_id: clientId,
    redirect_uri: window.location.origin,
  }),
);

mapApp.mount('#app');
