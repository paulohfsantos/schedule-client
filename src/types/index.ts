import { dayjs } from 'element-plus'

export type DayJsViewType = dayjs.ManipulateType

export type Event = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  initialTime: string;
  finalTime: string;
  description: string;
}

export type EventForm = Pick<Event, 'title' | 'start_date' | 'end_date' | 'description'>

export type EventFormEdit = Pick<Event, 'id' | 'title' | 'start_date' | 'end_date' | 'description'>

export enum ViewType {
  Month = 'month',
  Week = 'week',
  Day = 'day',
}

export type CalendarEvent = {
  date: string;
  isCurrentMonth: boolean;
  events: Event[];
}