import { createApp } from "vue";
import Vue3GoogleLoginPlugin from "vue3-google-login";
import App from "./App.vue";
import "./assets/main.css";
import { init_router } from "./router";
import { VueQueryPlugin } from '@tanstack/vue-query'


const app = createApp(App);

app.use(VueQueryPlugin)
app.use(Vue3GoogleLoginPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.use(init_router());

app.mount("#app");
