<script setup lang="ts">
import { use_auth } from '@/use_auth';
import { GoogleLogin, type CallbackTypes } from "vue3-google-login";

const { auth_state, do_logout, do_sign_in } = use_auth();
const callback: CallbackTypes.CredentialCallback = async (res) => {
  await do_sign_in({
    auth_provider: 'google',
    credential: res.credential,
  });
};
const handle_logout = () => {
  do_logout();
}
</script>

<template>
  <div class="root">
    <GoogleLogin v-show="auth_state === 'guest'" :callback />
    <button v-show="auth_state === 'user'" @click="handle_logout">
      Logout
    </button>
  </div>
</template>

<style scoped>
.root {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  padding: 0.4rem;
  height: 50px;
}
</style>