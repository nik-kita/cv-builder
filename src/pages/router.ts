import { createRouter, createWebHistory } from "vue-router";
import { use_auth_store } from "../store/auth";
import type { OmitReplace } from "../utils/types";
import HomePage from "./HomePage.vue";
import LoginPage from "./LoginPage.vue";
import {
  type Endpoint,
  type ENDPOINT_NAME,
  PRIVATE_ENDPOINTS,
  PUBLIC_ENDPOINTS,
} from "./const";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./AboutPage.vue"),
  },
] satisfies OmitReplace<Parameters<typeof createRouter>[0]["routes"][number], {
  path: keyof typeof ENDPOINT_NAME;
  name: typeof ENDPOINT_NAME[keyof typeof ENDPOINT_NAME];
}>[];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = use_auth_store();

  if (auth.user && (PUBLIC_ENDPOINTS as string[]).includes(to.path)) {
    return "/" satisfies Endpoint;
  } else if ((PRIVATE_ENDPOINTS as string[]).includes(to.path)) {
    return "/login" satisfies Endpoint;
  }
});

export default router;
