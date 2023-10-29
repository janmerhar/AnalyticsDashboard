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
  //   fallbackLocale: "si",
  messages: {
    en,
  },
  legacy: false,
});

const app = createApp(App);

registerPlugins(app);
app.use(i18n);
app.mount("#app");
