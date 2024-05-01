<script setup lang="ts">
import UsernameWatcher from '@/components/UsernameWatcher.vue';


withDefaults(defineProps<{
  is_usernamed?: boolean;
}>(), {
  is_usernamed: true,
});

</script>
<template>
  <UsernameWatcher v-if="is_usernamed" />
  <slot></slot>
</template>
