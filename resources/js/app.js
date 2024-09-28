import './bootstrap';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';

// vue app
const app = createApp(App);

// pinia
const pinia = createPinia();

app.use(router).use(pinia).mount("#app");
