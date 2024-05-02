<script setup lang="ts">
import AuthHeader from '@/components/AuthHeader.vue';
import { use_auth } from '@/use_auth';

const {
  role,
} = use_auth();
</script>
<template>
  <AuthHeader />
  <slot></slot>
  <ul>
    <li v-show="role === 'user.owner'">
      <RouterLink to="/settings">Settings</RouterLink>
    </li>
  </ul>
</template>
