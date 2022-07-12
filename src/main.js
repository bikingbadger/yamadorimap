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
import InputText from 'primevue/inputtext';
import Card from 'primevue/card'; //icons
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';

// Import Pinia for state
import { createPinia } from 'pinia';

import { Auth0Plugin } from './auth/auth0-plugin.js';

const mapApp = createApp(App);

// Use router
mapApp.use(router);

// Use Prime Vue
mapApp.use(PrimeVue, { ripple: true });
mapApp.component('Button', Button);
mapApp.component('InputText', InputText);
mapApp.component('Card', Card);
mapApp.component('Avatar', Avatar);
mapApp.component('Badge', Badge);
mapApp.directive('badge', BadgeDirective);

// Use pinia for state
mapApp.use(createPinia());

// Install authentication plugin
mapApp.use(Auth0Plugin);

mapApp.mount('#app');
