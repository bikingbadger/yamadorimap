import { createApp } from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia';
import router from './router';

// Add  auth0
import { domain, clientId } from '../auth_config.json';
import { createAuth0 } from '@auth0/auth0-vue';

const mapApp = createApp(App);

// Add router
mapApp.use(router);

// Add pinia for state
mapApp.use(createPinia());

// Install authentication plugin
mapApp.use(createAuth0({
    domain: domain,
    client_id: clientId,
    redirect_uri: window.location.origin
}));

mapApp.mount('#app');
