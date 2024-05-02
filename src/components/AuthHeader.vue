<script setup lang="ts">
import { api_sing_in } from '@/api/api_sign_in';
import { auth_stuff, use_auth } from '@/use_auth';
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { type CallbackTypes, GoogleLogin } from 'vue3-google-login';


const router = useRouter();
const { user, role } = use_auth();

onUnmounted(auth_stuff.role_watcher(router));

const callback: CallbackTypes.CredentialCallback = async (res) => {
  const api_res = await api_sing_in({ auth_provider: 'google', credential: res.credential });
  auth_stuff.success_sing_in(api_res);
};

</script>

<template>
  <GoogleLogin v-show="!user" :callback :error="console.error" />
  <button v-show="user" @click="auth_stuff.logout">Logout</button>
  <button v-show="role === 'user.guest'">
    <RouterLink
      :to="`/${user?.username ? user.username : ''}${router.currentRoute.value.path.split('/').slice(2).join('/')}`">
      Back to my</RouterLink>
  </button>
</template>
