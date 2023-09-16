<template>
  <el-row justify="end">
    <schedule-custom-view-mode :style="{ display: 'none' }" @viewChanged="handleViewChange" />
    <div class="selectors">
      <el-button size="small" @click="selectPrevious">
        {{ '<' }}
      </el-button>
      <el-button size="small" @click="selectCurrent">Today</el-button>
      <el-button size="small" @click="selectNext">
        {{ '>' }}
      </el-button>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElRow, ElButton, dayjs } from 'element-plus'
import type { DayJsViewType } from '@/types'
import ScheduleCustomViewMode from './ScheduleCustomViewMode.vue';

const props = defineProps({
  selectedDate: {
    type: dayjs.Dayjs,
    required: true
  },

  currentDate: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['dateSelected', 'viewChanged'])
const choosenDay = ref<DayJsViewType>('month')

const selectPrevious = () => {
  let previousDate = props.selectedDate.subtract(1, choosenDay.value)
  emit('dateSelected', previousDate)
}

const selectCurrent = () => {
  emit('dateSelected', props.currentDate)
}

const selectNext = () => {
  let nextDate = props.selectedDate.add(1, choosenDay.value)
  emit('dateSelected', nextDate)
}

const handleViewChange = (view: DayJsViewType) => {
  choosenDay.value = view
  emit('viewChanged', view)
}
</script>

<style lang="scss" scoped>
.selectors {
  margin-left: 1rem;
}
</style>