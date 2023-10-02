<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current-event': isNotTodayAndHasEvents,
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday,
      'calendar-day--today-event': isTodayAndHasEvents,
      'calendar-day--display_month': currentView === 'month',
    }"
  >
    <span class="event_label">{{ label }}</span>

    <div class="calendar-day_events">
      <div
        v-for="(item, index) in sortedDays"
        :key="index"
        class="calendar-day__event"
        @click="editEvent(item)"
        :style="{
          top: calculateTop(item),
        }"
      >
        <div
          class="calendar-day__event-time"
          :class="{
            'isTodayAndHasEvents': isTodayAndHasEvents,
            'isNotTodayAndHasEvents': isNotTodayAndHasEvents,
          }"
        >
          {{ item.start_date }} - {{ item.end_date }}
        </div>
        <div class="calendar-day__event-title">
          {{ item.description }}
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dayjs } from 'element-plus'
import { formatDate } from '@/utils/formatDate';
import type { PropType } from 'vue';
import type { Event, ViewType, CalendarEvent } from '@/types'

const props = defineProps({
  events: {
    type: Array as PropType<Event[]>,
    required: true
  },
  day: {
    type: Object as PropType<CalendarEvent>,
    required: true
  },
  isCurrentMonth: {
    type: Boolean,
    required: true
  },
  currentView: {
    type: String as PropType<ViewType>,
    required: true
  },
  isToday: {
    type: Boolean,
    default: false
  },
})

const isNotTodayAndHasEvents = computed(() => {
  return !props.isToday && props.events.length > 0
})

const isTodayAndHasEvents = computed(() => {
  return props.isToday && props.events.length > 0
})

const label = computed(() => {
  return formatDate(props.day.date, 'D')
})

const sortedDays = computed(() => {
  return props.events.sort((a, b) => {
    return dayjs(a.start_date, 'HH:mm')
      .isAfter(dayjs(b.start_date, 'HH:mm'))
        ? -1
        : 1
  })
})

const calculateTop = (event: Event) => {
  const startHour = event.initialTime
    ? parseInt(event.initialTime.split(":")[0])
    : 0;
  const startMinute = event.initialTime
    ? parseInt(event.initialTime.split(":")[1])
    : 0;
  const totalMinutes = startHour * 60 + startMinute;
  const minutesFromStartOfDay = totalMinutes - (6 * 60); // Assume day starts at 6am
  const pixelsFromTop = (minutesFromStartOfDay / 60) * 40; // Assume each hour is 40 pixels tall

  return `${pixelsFromTop}px`;
}

const editEvent = (event: Event) => {
  console.log(event)
}
</script>

<style lang="scss" scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  color: #3e4e63;
  padding: 5px;
  height: 100px;
  overflow-y: auto;
  // cursor: pointer;

  // span {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: absolute;
  //   right: 2px;
  //   width: 20px;
  //   height: 20px;

  //   @media screen and (max-width: 768px) {
  //     position: unset;
  //     right: unset;
  //     width: unset;
  //     height: unset;
  //     font-size: unset !important;
  //   }
  // }

  // @media screen and (max-width: 768px) {
  //   min-height: 80px;
  //   // firefox
  //   scrollbar-width: thin;

  //   &::-webkit-scrollbar {
  //     width: 5px;
  //   }
  // }
}

// .calendar-day--not-current {
//   background-color: #528fd499;
//   color: #fff;
// }

// .calendar-day--today {
//   padding-top: 4px;
//   background-color: #F5F5F5;

//   span {
//     color: #fff;
//     border-radius: 9999px;
//     background-color: #528fd4;
//     font-size: 10.2px;
//   }
// }

// .calendar-day--display_month {
//   height: 100px;
//   font-size: 12px;
//   border: 1px solid #e0e0e0;
// }

// .calendar-day--not-current-event {
//   span {
//     color: #fff;

//     @media screen and (max-width: 768px) {
//       color: unset;
//     }
//   }
// }

// .calendar-day__event {
//   background-color: #528fd4;
//   color: #fff;
//   padding: 2px;
//   font-size: 10.2px;
//   margin-bottom: 2px;
//   border-radius: 4px;

//   .isTodayAndHasEvents {
//     @media screen and (max-width: 768px) {
//       display: none;
//     }
//   }

//   .isNotTodayAndHasEvents {
//     @media screen and (max-width: 768px) {
//       display: none;
//     }
//   }

//   .calendar-day__event-title {
//     @media screen and (max-width: 768px) {
//       white-space: nowrap;
//       overflow: hidden;
//     }
//   }
// }
</style>