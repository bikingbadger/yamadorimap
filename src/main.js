import { createApp } from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import { createPinia } from 'pinia';

// Add  auth0
import { domain, clientId, audience } from '../auth_config.json';
import { Auth0Plugin } from '@/auth/auth0-plugin';

const mapApp = createApp(App);

// Add pinia for state
mapApp.use(createPinia());

// Install authentication plugin
mapApp.use(Auth0Plugin, {
    domain,
    clientId,
    audience,
    onRedirectCallback: (appState)-> {
        router.push(
            appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
        )
    }
})

mapApp.mount('#app');
