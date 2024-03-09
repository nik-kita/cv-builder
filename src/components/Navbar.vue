<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { COMMON_ENDOINTS, ENDPOINT_NAME, PRIVATE_ENDPOINTS, PUBLIC_ENDPOINTS } from '../pages/const';
import { use_auth_store } from '../store/auth';

const auth = use_auth_store();
const route = useRoute();

</script>

<template>
  <ul>
    <template v-if="auth.user">
      <li v-show="route.path !== link" v-for="link of PRIVATE_ENDPOINTS" :key="link">
        <RouterLink :to="link">{{ ENDPOINT_NAME[link] }}</RouterLink>
      </li>
    </template>
    <template v-else>
      <li v-show="route.path !== link" v-for="link of PUBLIC_ENDPOINTS" :key="link">
        <RouterLink :to="link">{{ ENDPOINT_NAME[link] }}</RouterLink>
      </li>
    </template>
    <hr />
    <li v-show="route.path !== link" v-for="link of COMMON_ENDOINTS" :key="link">
      <RouterLink :to="link">
        {{ ENDPOINT_NAME[link] }}
      </RouterLink>
    </li>
  </ul>
</template>
