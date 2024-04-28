import HomePage from "@/pages/HomePage.vue";
import ProfilesPage from "@/pages/ProfilesPage.vue";
import { use_auth } from '@/use_auth';
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
      {
        path: '/profiles',
        children: [
          {
            path: '',
            component: ProfilesPage,
            meta: {
              require_authentication: true,
            }
          },
          {
            path: ':user_id(\\d+)/:profile_name',
            props: true,
            component: () => import("@/pages/ProfileItemPage.vue"),
          }
        ]
      },
      /**@description 404 catch-all => redirect to home */
      {
        path: "/:pathMatch(.*)*",
        redirect: { name: "home" },
      },
    ],
  });

  const { is_user } = use_auth();

  router.beforeEach((to, from) => {
    if (to.meta.require_authentication && !is_user.value) {
      return from.meta.require_authentication
        ? '/'
        : from;
    }
  });

  return router;
};
