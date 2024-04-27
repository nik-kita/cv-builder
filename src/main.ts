import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { init_router } from "./router";

const app = createApp(App);

app.use(init_router());

app.mount("#app");
