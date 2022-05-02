import { createApp } from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia'


const mapApp = createApp(App);

// Add pinia for state
mapApp.use(createPinia())


mapApp.mount('#app');
