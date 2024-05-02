<script setup lang="ts">
import { api_upsert_username } from '@/api/api_upsert_username';
import { use_auth } from '@/use_auth';
import { computed } from 'vue';
import SingleInput from './SingleInput.vue';

const { user } = use_auth();
const start_btn_label = computed(() => {
  return user.value?.username ? 'Change' : 'Add';
});
const title = computed(() => {
  return user.value?.username ? `Your username is ${user.value.username}` : 'You have\'t username';
});
const handle_confirm = async (value: string) => {
  try {
    const res = await api_upsert_username(value);

    user.value!.username = res.nik;
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div>
    <h4>{{ title }}</h4>
    <SingleInput :handle_confirm :start_btn_label :init_input_value="user?.username || ''" :validations="[
      {
        tip: 'must be at least 3 characters long',
        predicate: (value: string) => value.length >= 3,
      },
      {
        tip: 'must be at most 20 characters long',
        predicate: (value: string) => value.length <= 20,
      },
      {
        tip: 'must contain only letters/numbers or hyphen',
        predicate: (value: string) => /^[a-zA-Z0-9-]+$/.test(value),
      },
    ]" />
  </div>
</template>
