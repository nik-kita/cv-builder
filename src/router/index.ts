import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const init_router = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        component: HomePage,
        meta: {
          is_usernamed: true,
        }
      },
      {
        path: "/:username",
        component: HomePage,
        meta: {
          is_usernamed: true,
        }
      },
    ],
  });

  return router;
};
