<script setup lang="ts">
import { role_watcher, use_auth } from '@/use_auth';
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
const { user, role } = use_auth();

onUnmounted(role_watcher(router));

</script>
<template>
  <slot></slot>
</template>
