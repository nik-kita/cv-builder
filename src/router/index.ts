import HomePage from "@/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const init_router = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "home",
        component: HomePage,
      },
      /**@description 404 catch-all => redirect to home */
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        redirect: { name: "home" },
      },
    ],
  });

  return router;
};
