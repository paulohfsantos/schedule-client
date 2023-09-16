<template>
  <ul class="day-of-week">
    <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const weekdays = computed(() => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
})
</script>

<style lang="scss" scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  li {
    text-align: center;
    list-style: none;
    padding-right: 5px;
  }
}
</style>