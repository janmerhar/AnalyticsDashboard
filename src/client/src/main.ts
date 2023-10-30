/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";

// Locales
import { createI18n } from "vue-i18n";
import en from "../src/locales/en";

const i18n = createI18n({
  locale: "en",
  messages: {
    en,
  },
  legacy: false,
});

const app = createApp(App);

registerPlugins(app);
app.use(i18n);

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";

app.config.globalProperties.$http = axios;

app.mount("#app");
