<template>
  <h3 class="calendar-date-indicator">{{ selectedMonth }}</h3>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dayjs, } from 'element-plus';

const props = defineProps({
  selectedDate: {
    type: dayjs.Dayjs,
    required: true
  }
})

const selectedMonth = computed(() => {
  return props.selectedDate.format("MMMM YYYY").charAt(0).toUpperCase()
    + props.selectedDate.format("MMMM YYYY").slice(1);
})
</script>

<style lang="scss" scoped>
h3 {
  margin: 0;
  font-weight: 400;
  color: #303133;
}
</style>