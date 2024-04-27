import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const init_router = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: HomePage,
      },
    ],
  });

  return router;
};
