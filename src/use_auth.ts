import { computed, ref, watchEffect } from 'vue';
import type { Router } from 'vue-router';
import { api_logout } from './api/api_logout';
import { get_info } from './common/info';
import { get_refresh_token, update_tokens } from './common/tokens';


const prev_refresh_token = get_refresh_token();
const prev_username = get_info()?.username;
const user = ref<{
  username?: string | null;
} | undefined | null>(prev_refresh_token ? {
  username: prev_username,
} : undefined);
const username = computed(() => user.value?.username);
const role = ref<'guest' | 'user.owner' | 'user.guest'>('guest');

const role_watcher = (router: Router) => {
  return watchEffect(() => {
    const u = user.value;
    const route = router.currentRoute.value;
    const uname = username.value;
    let upath = route.params.username;

    /**
     * @description compute /:username
     */
    if (
      route.meta.is_usernamed
      && !route.params.username
      && uname
    ) {
      upath = uname;
      const path = `${upath}${route.path}`;

      router.replace({ path });
    }

    /**
     * @description role between page /:username and actual user
     */
    if (!u) {
      role.value = 'guest';
    } else if (u.username) {
      role.value = (!upath || uname === upath) ? 'user.owner' : 'user.guest';
    } else if (upath) {
      role.value = 'user.guest';
    }
  });
};

const success_sing_in = (res: ApiRes<'post', '/auth/sign-in'>) => {
  update_tokens({ access_token: res.access_token, refresh_token: res.refresh_token });
  user.value = { username: res.nik };
};

const logout = () => {
  const refresh_token = get_refresh_token();
  update_tokens();
  user.value = undefined;
  if (!refresh_token) {
    console.error('refresh_token not found');

    return;
  }

  api_logout({ refresh_token }).catch(console.error);
};

export const auth_stuff = {
  success_sing_in,
  logout,
  role_watcher,
};

export const use_auth = () => {
  return {
    user,
    role,
  };
};
