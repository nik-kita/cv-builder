import { get_access } from "@/stuff/get_access";
import { get_refresh } from "@/stuff/get_refresh";
import { update_tokens } from "@/stuff/update_tokens";
import { computed, ref } from "vue";
import { api_logout } from "./api/api_logout";
import { api_sign_in } from "./api/api_sign_in";

const auth_state = ref<"user" | "guest">(
  get_refresh() && get_access() ? "user" : "guest",
);
const is_user = computed(() => auth_state.value === 'user');
const do_logout = () => {
  const refresh = get_refresh();

  if (refresh) {
    api_logout(refresh).catch(console.error);
  }

  update_tokens();
  auth_state.value = "guest";
};
const do_sign_in = async (
  payload: { credential: string; auth_provider: string },
) => {
  try {
    const res = await api_sign_in(payload);
    update_tokens({
      access_token: res.access_token,
      refresh_token: res.refresh_token,
    });
    auth_state.value = "user";
  } catch (err) {
    console.error(err);
    update_tokens();
    auth_state.value = "guest";
  }
};

export const use_auth = () => {
  return {
    is_user,
    auth_state,
    do_sign_in,
    do_logout,
  };
};
