<script setup lang="ts">
import NavMenu from '@/components/Navigation/NavMenu.vue';
import { hasToken } from './common/headerAuth';
</script>

<template>
  <NavMenu v-if="hasToken()" />

  <main>
    <RouterView />
  </main>
</template>
