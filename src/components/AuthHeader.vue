<script setup lang="ts">
import { role_watcher, use_auth } from '@/use_auth';
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { type CallbackTypes, GoogleLogin } from 'vue3-google-login';


const router = useRouter();
const { user, role } = use_auth();

onUnmounted(role_watcher(router));

const callback: CallbackTypes.CredentialCallback = (res) => {
  console.log(res);
};

</script>
<template>
  <GoogleLogin v-show="!user" :callback :error="console.error" />
  <button v-show="role === 'user.guest'">
    <RouterLink :to="{
      params: {
        username: user?.username,
      }
    }">Back to me</RouterLink>
  </button>
</template>
