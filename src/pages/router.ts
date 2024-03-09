import { createRouter, createWebHistory } from "vue-router";
import { use_auth_store } from "../store/auth";
import HomePage from "./HomePage.vue";
import LoginPage from "./LoginPage.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/about",
    component: () => import("./AboutPage.vue"),
  },
] as const;
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const public_routes = [
  "/about",
  "/login",
] satisfies typeof routes[number]["path"][];
router.beforeEach((to) => {
  const only_public = (public_routes as string[]).includes(to.path);

  if (!only_public) {
    const auth = use_auth_store();

    if (!auth.user) {
      return "/login" satisfies typeof public_routes[number];
    }
  }
});

export default router;
