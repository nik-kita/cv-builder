import "./assets/main.css";
import Vue3GoogleLogin from 'vue3-google-login';
import { createApp } from "vue";
import App from "./App.vue";
import { init_router } from "./router";


const app = createApp(App);

app.use(init_router());
app.use(Vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.mount("#app");
