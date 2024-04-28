<script setup lang="ts">
import RootLayout from '@/layouts/RootLayout.vue';

const props = defineProps<{
  profile_name: string,
  user_id: string,
}>();
</script>
<template>
  <RootLayout>
    <h1>{{ props.profile_name }}</h1>
  </RootLayout>
</template>