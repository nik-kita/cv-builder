import { defineStore } from "pinia";
import { ref } from "vue";

export const use_auth_store = defineStore("auth", () => {
  const user = ref<Auth>();

  function logout() {
    user.value = undefined;
  }

  return {
    user,
    logout,
  };
});

type User = {
  email: string;
};
type Auth =
  & User
  & Partial<{
    access: string;
    refresh: string;
  }>;
