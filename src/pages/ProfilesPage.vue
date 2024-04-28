<script setup lang="ts">
import RootLayout from '@/layouts/RootLayout.vue';
import { use_api } from '@/use_api';


const {
  isFetched,
  isLoading,
  data,
} = use_api().profiles();


</script>
<template>
  <RootLayout>
    <h1>Your profiles</h1>
    <p v-show="isLoading">Loading...</p>
    <ul v-if="isFetched">
      <li v-for="profile of data?.items" :key="profile.id">
        <RouterLink :to="'/profiles/' + profile.user_id + '/' + profile.name">{{ profile.name }}</RouterLink>
      </li>
    </ul>
  </RootLayout>
</template>