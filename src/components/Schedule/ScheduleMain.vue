<template>
  <el-card shadow="never" class="calendar-month">
    <el-row>
      <el-col :span="3">
        <schedule-date-indicator :selectedDate="selectedDate" />
      </el-col>

      <!-- actions -->
      <el-col :span="13" class="actions">
        <el-row>
          <el-button size="small">Agendar</el-button>
          <el-button size="small">Convites</el-button>
        </el-row>
      </el-col>
      
      <!-- date selector -->
      <el-col :span="8">
        <schedule-date-selector
          :selectedDate="selectedDate"
          :currentDate="currentDate"
          @dateSelected="handleDateChange"
          @viewChanged="handleViewChange"
        />
      </el-col>
    </el-row>

    <el-divider />

    <schedule-week-days />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ElCard,
  ElRow,
  ElCol,
  ElButton,
  ElDivider,
  dayjs
} from 'element-plus'
import ScheduleDateIndicator from './ScheduleDateIndicator.vue';
import ScheduleDateSelector from './ScheduleDateSelector.vue';
import ScheduleWeekDays from './ScheduleWeekDays.vue';
import type { DayJsViewType } from '@/types';

const selectedDate = ref(dayjs());
const currentDate = ref(dayjs().format('YYYY-MM-DD'));

const handleViewChange = (view: DayJsViewType) => {
  console.log(view)
}

const handleDateChange = (date: string) => {
  selectedDate.value = dayjs(date)
}
</script>

<style lang="scss"></style>