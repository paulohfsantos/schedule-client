<template>
  <el-card shadow="never" class="calendar-month">
    <el-row>
      <el-col :span="3">
        <schedule-date-indicator :selectedDate="selectedDate" />
      </el-col>

      <!-- actions -->
      <el-col :span="13" class="actions">
        <el-row>
          <el-button size="small">Criar evento</el-button>
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

    <el-divider />

    <ul class="days-grid">
      <schedule-month-day-item
        v-for="(day, index) in months"
        :key="index"
        :day="day"
        :events="day.events"
        :isCurrentMonth="day.isCurrentMonth"
        :currentView="currentView"
      />
    </ul>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
import ScheduleMonthDayItem from './ScheduleMonthDayItem.vue';
import type { ViewType, DayJsViewType, Event } from '@/types';

// replace this later with api data
const events = ref<Event[]>([])
const selectedDate = ref(dayjs());
const currentDate = ref(dayjs().format('YYYY-MM-DD'));
const currentView = ref<ViewType>("month" as ViewType);

const handleViewChange = (view: DayJsViewType) => {
  console.log(view)
}

const handleDateChange = (date: string) => {
  selectedDate.value = dayjs(date)
}

const year = computed(() => {
  console.log(selectedDate);
  return Number(selectedDate.value.format('YYYY'))
})

const month = computed(() =>
  Number(selectedDate.value.format('M')))

const numberOfDaysInMonth = computed(() =>
  selectedDate.value.daysInMonth())

const getWeekday = (day: number | string) => {
  return dayjs(day).weekday()
}

const months = computed(() => {
  return [
    ...previousMonth.value,
    ...currentMonth.value,
    ...nextMonth.value,
  ]
})

const previousMonth = computed(() => {
  const firstDayWeekday = getWeekday(currentMonth.value[0].date);
  const visibleDaysFromPrevMonth = firstDayWeekday ? firstDayWeekday - 1 : 6;
  const startVisibleDate = dayjs(currentMonth.value[0].date)
    .subtract(visibleDaysFromPrevMonth, "day");

    return Array.from({ length: visibleDaysFromPrevMonth }, (_, index) => ({
      date: startVisibleDate.add(index, "day").format("YYYY-MM-DD"),
      isCurrentMonth: false,
      events: filterEventsForDate(
        startVisibleDate.add(index, "day").format("YYYY-MM-DD")
      )
    }));
})

const currentMonth = computed(() => {
  return Array.from({ length: numberOfDaysInMonth.value }, (_, index) => {
    const currentDate = formatDate(index + 1);

    return {
      date: currentDate,
      isCurrentMonth: true,
      events: filterEventsForDate(currentDate),
    };
  });
})

const nextMonth = computed(() => {
  const lastDayWeekday = getWeekday(
    `${year.value}-${month.value}-${currentMonth.value.length}`
  );
  const visibleDaysFromNextMonth = lastDayWeekday
    ? 7 - lastDayWeekday
    : 0;
  const startOfNextMonth = dayjs(`${year.value}-${month.value}-01`).add(1, "month");
  return Array.from({ length: visibleDaysFromNextMonth }, (_, index) => ({
    date: startOfNextMonth.add(index, "day").format("YYYY-MM-DD"),
    isCurrentMonth: false,
    events: filterEventsForDate(
      startOfNextMonth.add(index, "day").format("YYYY-MM-DD")
    )
  }));
})


const formatDate = (day: number) => {
  return dayjs(`${year.value}-${month.value}-${day}`).format('YYYY-MM-DD')
}

const filterEventsForDate = (date: string) => {
  return events.value.filter(event => event.start_date === date)
}
</script>

<style lang="scss" scoped>
.calendar-month {
  position: relative;

  .calendar-month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: solid 1px #b5c0cd;

    @media screen and (max-width: 768px) {
      display: block;
    }

    .calendar-header {
      display: flex;
      align-items: center;

      .button_group {
        margin-left: 4rem;

        @media screen and (max-width: 768px) {
          margin: 1rem 0;
          display: flex;
          justify-content: space-between;
        }
      }

      .user_schedule {
        margin-left: 3rem;

        .el-select {
          @media screen and (max-width: 768px) {
            width: 100%;
          }
        }

        @media screen and (max-width: 768px) {
          margin: 1rem 0;
        }
      }

      .subtitle {
        margin-left: 25px;
        display: flex;

        .own_event {
          display: flex;
          align-items: center;
          .bg-primary {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #528fd4;
          }
          span {
            margin-left: 5px;
            font-size: 12px;
          }
        }

        .invited {
          display: flex;
          align-items: center;
          margin-left: 10px;
          .bg-success {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #4ab84a;
          }
          span {
            margin-left: 5px;
            font-size: 12px;
          }
        }

        @media screen and (max-width: 768px) {
          margin: 0;
        }
      }

      @media screen and (max-width: 768px) {
        display: block;
      }
    }
  }

  .day-of-week {
    color: #3e4e63;
    font-size: 18px;
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 10px;

    @media screen and (max-width: 768px) {
      padding: 0;
      font-size: 16px;
      margin-left: 40px;
    }
  }

  .day-of-week, .days-grid {
    display: grid;
    list-style: none;
    grid-template-columns: repeat(7, 1fr);
  }

  .days-grid {
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(7, 1fr);
      padding: 0;
    }
  }

  .day-of-week > * {
    text-align: right;
    padding-right: 5px;
  }

  .days-grid {
    height: 100%;
    position: relative;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
  }

  .days-grid--week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    column-gap: 1px;
    padding-left: 10px;

    @media (max-width: 768px) {
      column-gap: 0;
    }
  }

  .days-grid--day {
    padding-left: 10px;
  }
}
</style>