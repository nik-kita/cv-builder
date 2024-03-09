<script setup lang="ts">
import Navbar from './Navbar.vue';


const props = defineProps<{
  with_navbar: boolean,
}>();
</script>

<template>
  <div class="root">
    <div class="nav">
      <Navbar v-show="props.with_navbar" />
    </div>
    <div class="con">
      <slot></slot>
    </div>
    <div class="foo"></div>
  </div>
</template>

<style>
.root {
  height: 100%;
  gap: 1rem;
  display: grid;
  /* grid-template-rows: minmax(200px, 1fr) minmax(2fr, 100%) minmax(200px, fr); */
  grid-template:
    "nav nav nav nav"
    "con con con con"
    "foo foo foo foo";
}

.nav {
  grid-area: nav;
}

.con {
  grid-area: con;
}

.foo {
  grid-area: foo;
}
</style>