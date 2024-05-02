import { computed, ref, watchEffect } from 'vue';
import type { Router } from 'vue-router';

const user = ref<{
  username?: string;
}>();
const username = computed(() => user.value?.username);
const role = ref<'guest' | 'user.owner' | 'user.guest'>('guest');

export const role_watcher = (router: Router) => {
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

      console.log(path);
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


export const use_auth = () => {
  return {
    user,
    role,
  };
};
