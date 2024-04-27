<script setup lang="ts">
import LoginLogout from '@/components/LoginLogout.vue';


</script>
<template>
  <LoginLogout />
  <slot></slot>
  <RouterLink to="/profiles">Profiles</RouterLink>
  <RouterLink to="/broken-link">Broken link</RouterLink>
  <RouterLink to="/profiles/default">Default profile</RouterLink>
</template>