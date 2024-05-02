import HomePage from "@/pages/HomePage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import { use_auth } from "@/use_auth";
import { createRouter, createWebHistory } from "vue-router";

export const init_router = () => {
  const { user } = use_auth();

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: "/home",
        component: HomePage,
        meta: {
          is_usernamed: true,
        }
      },
      {
        path: "/home/:username",
        component: HomePage,
        meta: {
          is_usernamed: true,
        }
      },
      {
        path: '/settings',
        component: SettingsPage,
        meta: {
          is_private: true,
        }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        redirect: '/home',
      },
    ],
  });

  router.beforeResolve((to, from) => {
    if (to.meta.is_private && !user.value) {
      return '/home';
    }
  });

  return router;
};
